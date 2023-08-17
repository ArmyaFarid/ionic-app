import React, { useState } from "react";
import FormWrapper from "../forms/FormWrapper";
import Api from "../../../helper/Api";
import formatPrice from "../../../helper/formatter";
import * as swal from 'sweetalert2';
import {IonButton, IonCol, IonIcon, IonItem, IonLabel, IonRow} from "@ionic/react";
import {createOutline, trashOutline} from "ionicons/icons";


interface OrderRowProps {
    order: any;
    pageWidth: number;
    handleReloadTable: () => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, pageWidth, handleReloadTable }) => {
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

    const handleCancelOrder = (e: React.MouseEvent) => {
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
            {/*<IonItem>*/}
            {/*    <IonLabel>*/}
            {/*        <h2>{order.name}</h2>*/}
            {/*        <p>{order.brand}</p>*/}
            {/*    </IonLabel>*/}
            {/*    <IonLabel>{order.category}</IonLabel>*/}
            {/*    <IonLabel>{formatPrice(order.unit_price)}</IonLabel>*/}
            {/*    <IonLabel>{order.quantity}</IonLabel>*/}
            {/*    <IonLabel>{formatPrice(order.quantity * order.unit_price)}</IonLabel>*/}
            {/*    /!*<IonLabel>*!/*/}
            {/*    /!*    <div*!/*/}
            {/*    /!*        className="state-tag"*!/*/}
            {/*    /!*        style={{ backgroundColor: getStateTag(order.state).color, cursor: 'pointer' }}*!/*/}
            {/*    /!*        onClick={handleStateChange}*!/*/}
            {/*    /!*    >*!/*/}
            {/*    /!*        {getStateTag(order.state).text}*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*</IonLabel>*!/*/}
            {/*    /!*<IonLabel>*!/*/}
            {/*    /!*    {order.state === 'WAITING' && (*!/*/}
            {/*    /!*        <>*!/*/}
            {/*    /!*            <IonButton className="edit-btn" onClick={showForm} fill="clear" color="medium">*!/*/}
            {/*    /!*                <IonIcon slot="icon-only" icon={createOutline} />*!/*/}
            {/*    /!*            </IonButton>*!/*/}
            {/*    /!*            <IonButton className="delete-btn" onClick={handleCancelOrder} fill="clear" color="medium">*!/*/}
            {/*    /!*                <IonIcon slot="icon-only" icon={trashOutline} />*!/*/}
            {/*    /!*            </IonButton>*!/*/}
            {/*    /!*        </>*!/*/}
            {/*    /!*    )}*!/*/}
            {/*    /!*</IonLabel>*!/*/}
            {/*</IonItem>*/}

            <IonRow className="table-row">
                <IonCol size="4">
                    <IonLabel>
                        <h4>{order.name}</h4>
                        <p>{order.brand}</p>
                    </IonLabel>
                </IonCol>
                {/*<IonCol>*/}
                {/*    <IonLabel>{order.category}</IonLabel>*/}
                {/*</IonCol>*/}
                {/*<IonCol>*/}
                {/*    <IonLabel>*/}
                {/*        <h4>*/}
                {/*            {formatPrice(order.unit_price)}*/}
                {/*        </h4>*/}
                {/*    </IonLabel>*/}
                {/*</IonCol>*/}
                <IonCol>
                    <IonLabel>{order.quantity}</IonLabel>
                </IonCol>
                <IonCol>
                    <IonLabel>{formatPrice(order.quantity * order.unit_price)}</IonLabel>
                </IonCol>
                {/*<IonCol>*/}
                {/*    <IonButton className="edit-btn" onClick={showForm} fill="clear" color="medium">*/}
                {/*        <IonIcon slot="icon-only" icon={createOutline} />*/}
                {/*    </IonButton>*/}
                {/*    <IonButton className="delete-btn" onClick={handleCancelOrder} fill="clear" color="medium">*/}
                {/*        <IonIcon slot="icon-only" icon={trashOutline} />*/}
                {/*    </IonButton>*/}
                {/*</IonCol>*/}
            </IonRow>
        </>

    );
}

export default OrderRow;
