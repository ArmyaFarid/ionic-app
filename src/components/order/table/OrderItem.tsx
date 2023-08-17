import React, {useEffect, useRef, useState} from "react";
import FormWrapper from "../forms/FormWrapper";
import Api from "../../../helper/Api";
import formatPrice from "../../../helper/formatter";
import * as swal from 'sweetalert2';
import {
    IonButton,
    IonCol,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonRow
} from "@ionic/react";
import {createOutline, ellipsisVerticalOutline, trashOutline} from "ionicons/icons";
import './OrderItem.css';


interface OrderRowProps {
    order: any;
    pageWidth: number;
    handleReloadTable: () => void;
    showBubble:boolean;
    setShowBubble:(val:boolean)=>void;
    selectedOrderId:string|null;
    setSelectedOrderId:(val:string|null)=>void;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, pageWidth, handleReloadTable, showBubble , setShowBubble,selectedOrderId,setSelectedOrderId}) => {
    const [formModal, setFormModal] = useState(false);





    const api = new Api();
    const Swal = swal.default;
    const getStateTag = (state: string) => {
        // ... Same as before
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

    const hideForm = () => {
        setFormModal(false);
    };

    const showForm = () => {
        setFormModal(true);
    };

    const notify = false;

    const putData = (formData: any) => {
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

    const handleCancelOrder = () => {
        const formData ={
            state:"CANCEL"
        }

        alert("is canceled");

        Swal.fire({
            title: 'Vous etes sur le point d annuler une commande en traitement',
            text: "Vous pouvez la restorer dans l'historique",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Supprimer',
        }).then((result: { isConfirmed: any; }) => {
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

    const handleStateChange = () => {
        if (order.state==="WAITING"){
            handleFakeProviderComfirmOrder();
        }
        if (order.state==="PAYMENT"){
            handleValidateOrderPayement();
        }
        if (order.state==="DELIVERING"){
            handleFakeProviderDelivering();
        }
    };


    const toggleBubble = () => {
        setSelectedOrderId(order._id);
        toggleSliding();
        setShowBubble(!showBubble);
    };

    const slidingItemRef = useRef<HTMLIonItemSlidingElement | null>(null);


    const close = () => {
        if (slidingItemRef.current) {
            slidingItemRef.current.close();
        }
    };

    const open = () => {
        if (slidingItemRef.current) {
            slidingItemRef.current?.open("end");
        }
    };

    const toggleSliding =  () => {
        open();
    };

    const handleDrag = (event: CustomEvent) => {
        const slidingRatio = event.detail.openAmount / event.detail.width;
        if (slidingRatio >= 1) {
            handleCancelOrder();
        } else {
            //handleCancelOrder();
        }
    };

    return (
        <>
            <FormWrapper
                formModal={formModal}
    hideForm={hideForm}
    update={true}
    parentWidth={pageWidth}
    handeReloadOrders={handleReloadTable}
    id={order._id}
    />
         {/*<IonItem key={order._id} >*/}
         {/*       <IonLabel>*/}
         {/*           <h2>{order.name}</h2>*/}
         {/*           <p>Price: ${order.unit_price}</p>*/}
         {/*           <p>Quantity: {order.quantity}</p>*/}
         {/*           <p>Total Price: {formatPrice(order.quantity * order.unit_price)}</p>*/}
         {/*       </IonLabel>*/}
         {/*       <IonIcon icon={ellipsisVerticalOutline} onClick={toggleBubble} />*/}
         {/*    {showBubble && selectedOrderId === order._id &&(*/}
         {/*        <div className="bubble">*/}
         {/*            <div className="bubble-option">Edit</div>*/}
         {/*            <div className="bubble-option">View</div>*/}
         {/*            <div className="bubble-option">Upgrade</div>*/}
         {/*            <div className="bubble-option danger">Delete</div>*/}
         {/*        </div>*/}
         {/*    )}*/}
         {/*</IonItem >*/}
            <IonItemSliding key={order._id} ref={slidingItemRef} onIonDrag={handleDrag}>
                <IonItemOptions side="start">
                    <IonItemOption color="success" expandable>
                        Archive
                    </IonItemOption>
                </IonItemOptions>

                <IonItem>
                    <IonLabel>
                        <h2>{order.name}</h2>
                        <p>Price: ${order.unit_price}</p>
                        <p>Quantity: {order.quantity}</p>
                        <p>Total Price: {formatPrice(order.quantity * order.unit_price)}</p>
                    </IonLabel>
                    <IonIcon icon={ellipsisVerticalOutline} onClick={(e)=>{
                        toggleBubble();        console.log("clicked");
                    }} />
                </IonItem>

                <IonItemOptions side="end" onIonSwipe={handleCancelOrder}>
                    <IonItemOption onClick={showForm} >Edit</IonItemOption>
                    <IonItemOption color="danger" expandable onClick={handleCancelOrder} >
                        Cancel
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
    </>

);
}

export default OrderRow;
