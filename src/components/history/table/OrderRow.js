import { ReactComponent as DeleteIco } from '../../../assets/icons/trashIco.svg';

import Api from "../../../helper/Api";
import formatPrice from "../../../helper/formatter";

function OrderRow({order,handleReloadTable}) {


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


    const Swal = require('sweetalert2');
    const api = new Api(); // Base URI is set in the constructor
    const putData = (formData) => {

        api.putData('/order/'+order._id,formData)
            .then( (response) => {
                //do something awesome that makes the world a better place
                console.log(response)
                if(response.message==='Order updated successfully!'){
                    Swal.fire({
                        icon: 'success',
                        title: 'Commande modifié !',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    handleReloadTable()
                }else{
                    Swal.fire({
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

    const handleDeleteOrder = (e) => {
        e.preventDefault();
        const formData ={
            state:"DELETED"
        }

        Swal.fire({
            title: 'Vous etes sur le point de supprimer de l historique',
            text: "Suppression irreversible",
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
                    'Suppression terminé!',
                    'La commande a bien ete supprime de l historique.',
                    'success'
                )
            }
        })
    };


    const handleRestoreOrder = () => {
        const formData ={
            state:"WAITING"
        }

        if (order.state==="CANCEL"){
            putData(formData);
        }else{
            alert("Only for waiting...");
        }

    };

    const handleStateChange=()=>{
        if (order.state==="CANCEL"){
            handleRestoreOrder();
        }
    }


    return (
        <tr key={order._id}>
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
                    order.state === "CANCEL" &&
                    <>
                        <button className="delete-btn" disabled={!(order.state === "CANCEL")} onClick={handleDeleteOrder} style={{backgroundColor:"transparent",border:0,color:"#ACACAC"}}><DeleteIco/></button>
                    </>
                }
            </td>
        </tr>
    );
}

export default OrderRow;