import {useState} from "react";
import FormWrapper from "../forms/FormWrapper";
import Api from "../../../helper/Api";
import { ReactComponent as EditIco } from '../../../assets/icons/penIco.svg';
import { ReactComponent as DeleteIco } from '../../../assets/icons/trashIco.svg';
import formatPrice from "../../../helper/formatter";

function OrderRow({order,pageWidth,handleReloadTable}) {

    const [formModal, setFormModal] = useState(false);

    const getStateTag = (state) => {
        switch (state) {
            case 'WAITING':
                return    {
                    color:'#FEAF00',
                    text: "Traitement en cours"
                };
            case 'PAYMENT':
                return    {
                    color:'#CCFF00',
                    text: "En attente de payement"
                };
            case 'DELIVERING':
                return {
                    color:'#1DC524',
                    text: "Livraison en cours"
                };
            case 'DELIVERED':
                return {
                    color:'#0D9D00',
                    text: "Reçu"
                };
            case 'CANCEL':
                return {
                    color:'#FE0000',
                    text: "Annulé"
                };
            default:
                return {
                    color:'gray',
                    text: "...."
                };
        }
    };
    const hideForm=()=>{
        setFormModal(false);
    }

    const showForm = ()=>{
        setFormModal(true);
    }

    const Swal = require('sweetalert2');

    const api = new Api(); // Base URI is set in the constructor

    const notify = false;

    const putData = (formData) => {

        api.putData('/order/'+order._id,formData)
            .then( (response) => {
                //do something awesome that makes the world a better place
                console.log(response)
                if(response.message==='Order updated successfully!'){
                    notify && Swal.fire({
                        icon: 'success',
                        title: 'Commande modifié !',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    handleReloadTable()
                }else{
                    notify && Swal.fire({
                        icon: 'error',
                        title: response.error,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch((error) => {
            //console.error('NetworkError:', error);
        });
    };

    const handleCancelOrder = (e) => {
        e.preventDefault();
        const formData ={
            state:"CANCEL"
        }

        Swal.fire({
            title: 'Vous etes sur le point d annuler une commande en traitement',
            text: "Vous pouvez la restorer dans l'historique",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Supprimer',
        }).then((result) => {
            if (result.isConfirmed) {
                putData(formData);
                Swal.fire(
                    'Votre commande a bien ete annulé',
                    'success'
                )
            }
        })
    };

    const handleFakeProviderComfirmOrder = () => {
        const formData ={
            state:"PAYMENT"
        }

        if (order.state==="WAITING"){
            putData(formData);
        }else{
            alert("Only for waiting...");
        }

    };



    const handleValidateOrderPayement = () => {
        const formData ={
            state:"DELIVERING"
        }

        if (order.state==="PAYMENT"){
            putData(formData);
        }else{
            alert("Only for waiting...");
        }

    };

    const handleFakeProviderDelivering = () => {
        const formData ={
            state:"DELIVERED"
        }

        if (order.state==="DELIVERING"){
            putData(formData);
        }else{
            alert("Only for waiting...");
        }

    };

    const handleStateChange=()=>{
        if (order.state==="WAITING"){
            handleFakeProviderComfirmOrder();
        }
        if (order.state==="PAYMENT"){
            handleValidateOrderPayement();
        }
        if (order.state==="DELIVERING"){
            handleFakeProviderDelivering();
        }
    }


    return (
        <tr>
            <FormWrapper formModal={formModal} hideForm={hideForm} update={true} parentWidth={pageWidth} handeReloadOrders={handleReloadTable} id={order._id}/>
            <td>{order.name}<br/>{order.brand}</td>
            <td>{order.category}</td>
            <td>{formatPrice(order.unit_price)}</td>
            <td>{order.quantity}</td>
            <td>{formatPrice(order.quantity*order.unit_price)}</td>
            <td>
                <div className="state-tag" style={{backgroundColor: getStateTag(order.state).color,cursor:"pointer"}} onClick={handleStateChange} >
                    {getStateTag(order.state).text}
                </div>
            </td>
            <td>
                {
                    (order.state === "WAITING") &&
                    <>
                        <button className="edit-btn" onClick={showForm}  style={{backgroundColor:"transparent",border:0,color:"#ACACAC"}}><EditIco/> </button>
                        <button className="delete-btn" onClick={handleCancelOrder}   style={{backgroundColor:"transparent",border:0,color:"#ACACAC"}} > <DeleteIco/></button>
                    </>
                }
            </td>
        </tr>
    );
}

export default OrderRow;