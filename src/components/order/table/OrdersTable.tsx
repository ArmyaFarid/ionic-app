import React, { useEffect, useState } from 'react';
import Api from '../../../helper/Api';
import ServerErrorComponent from '../../utils/ServerErrorComponent';
import LoadingIndicator from '../../utils/LoadingIndicator';
import Row from "./Row";
import {IonAlert, IonCol, IonGrid, IonLabel, IonList, IonRow} from "@ionic/react";
import OrderItem from "./OrderItem";

interface OrdersTableProps {
    reloadData: number;
    pageWidth: number;
    searchString: string;
}

const initialState = [
    {
        "_id": "64dcbe589f78304c41aeb1c9",
        "name": "Ordinateur portable",
        "category": "Informatique",
        "brand": "HP",
        "unit_price": 999.99,
        "quantity": 1,
        "state": "PAYMENT",
        "providerId": "64dcb5929f78304c41aeb1bd"
    },
    {
        "_id": "64dcdf549f78304c41aeb1cb",
        "name": "Écran d'Ordinateur",
        "category": "Informatique",
        "brand": "Dell",
        "unit_price": 249.99,
        "quantity": 1,
        "state": "PAYMENT",
        "providerId": "64dcb5929f78304c41aeb1c1"
    },
    {
        "_id": "64dcdf639f78304c41aeb1cd",
        "name": "Appareil photo reflex",
        "category": "Photographie",
        "brand": "Canon",
        "unit_price": 899.99,
        "quantity": 5,
        "state": "WAITING",
        "providerId": "64dcb5929f78304c41aeb1be"
    },
    {
        "_id": "64dcdf699f78304c41aeb1cf",
        "name": "Chaise de bureau",
        "category": "Meubles",
        "brand": "Herman Miller",
        "unit_price": 599.99,
        "quantity": 1,
        "state": "WAITING",
        "providerId": "64dcb5929f78304c41aeb1c8"
    },
    {
        "_id": "64dcecb79f78304c41aeb1d1",
        "name": "Appareil photo reflex",
        "category": "Photographie",
        "brand": "Canon",
        "unit_price": 899.99,
        "quantity": 1,
        "state": "WAITING",
        "providerId": "64dcb5929f78304c41aeb1be"
    },
    {
        "_id": "64dcecbf9f78304c41aeb1d3",
        "name": "Appareil photo reflex",
        "category": "Photographie",
        "brand": "Canon",
        "unit_price": 899.99,
        "quantity": 1,
        "state": "WAITING",
        "providerId": "64dcb5929f78304c41aeb1be"
    },
    {
        "_id": "64dcecc59f78304c41aeb1d5",
        "name": "Appareil photo reflex",
        "category": "Photographie",
        "brand": "Canon",
        "unit_price": 899.99,
        "quantity": 1,
        "state": "WAITING",
        "providerId": "64dcb5929f78304c41aeb1be"
    },
    {
        "_id": "64dcecd19f78304c41aeb1d7",
        "name": "Souris sans fil",
        "category": "Électronique",
        "brand": "Logitech",
        "unit_price": 29.99,
        "quantity": 1,
        "state": "WAITING",
        "providerId": "64dcb5929f78304c41aeb1c2"
    },
    {
        "_id": "64dcecd79f78304c41aeb1d9",
        "name": "Imprimante laser",
        "category": "Bureautique",
        "brand": "Canon",
        "unit_price": 399.99,
        "quantity": 1,
        "state": "WAITING",
        "providerId": "64dcb5929f78304c41aeb1be"
    },
    {
        "_id": "64dd46fb9f78304c41aeb1db",
        "name": "Écran d'Ordinateur",
        "category": "Informatique",
        "brand": "Dell",
        "unit_price": 249.99,
        "quantity": 1,
        "state": "WAITING",
        "providerId": "64dcb5929f78304c41aeb1c1"
    }
]

const OrdersTable: React.FC<OrdersTableProps> = ({
                                                     reloadData,
                                                     pageWidth,
                                                     searchString,
                                                 }) => {
    const [groupedOrders, setGroupedOrders] = useState<{ [key: string]: any[] }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [changing, setChanging] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const [showBubble, setShowBubble] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);



    function doChanging() {
        setChanging(changing + 1);
    }

    const retryFetch = () => {
        doChanging();
        setError(null);
    };

    const groupOrdersByState = (orders: any[]) => {
        const statesOrder = ['WAITING', 'CANCEL', 'PAYMENT', 'DELIVERING', 'DELIVERED'];
        return statesOrder.reduce((acc:any, state:string) => {
            acc[state] = orders.filter((order) => order.state === state);
            return acc;
        }, {});
    };

    const api = new Api(); // Base URI is set in the constructor

    useEffect(() => {
        setIsLoading(true);
        api
            .fetchData('/order?name=' + searchString)
            .then((data) => {
                setGroupedOrders(groupOrdersByState(initialState));
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Les données ne peuvent pas être récupérées, réessayez plus tard');
                console.error('NetworkError:', error);
            });
        setGroupedOrders(groupOrdersByState(initialState));
    }, [changing, reloadData, searchString]);

    const handleDocumentClick = (event: MouseEvent) => {
        const bubble = document.querySelector('.bubble') as HTMLElement;
        if (bubble && !bubble.contains(event.target as Node)) {
            setShowBubble(false);
            setSelectedOrderId(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick);
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, [showBubble, selectedOrderId]);

    const fake = true;

    return (
        <>
            {error && <div><ServerErrorComponent retryFetch={retryFetch} /></div>}

            {fake && (

                <>
                    {/*<IonGrid >*/}
                    {/*<IonRow className="table-main-head ion-no-padding">*/}
                    {/*    <IonCol size="4">*/}
                    {/*        <IonLabel>Nom</IonLabel>*/}
                    {/*    </IonCol>*/}
                    {/*    /!*<IonCol >*!/*/}
                    {/*    /!*    <IonLabel>Categorie</IonLabel>*!/*/}
                    {/*    /!*</IonCol>*!/*/}
                    {/*    /!*<IonCol >*!/*/}
                    {/*    /!*    <IonLabel>Prix Unit</IonLabel>*!/*/}
                    {/*    /!*</IonCol>*!/*/}
                    {/*    <IonCol>*/}
                    {/*        <IonLabel>Quantite</IonLabel>*/}
                    {/*    </IonCol>*/}
                    {/*    <IonCol >*/}
                    {/*        <IonLabel>Prix Total</IonLabel>*/}
                    {/*    </IonCol>*/}
                    {/*    /!*<IonCol size="2">*!/*/}
                    {/*    /!*    <IonLabel>État d'acquisition</IonLabel>*!/*/}
                    {/*    /!*</IonCol>*!/*/}
                    {/*    /!*<IonCol size="1"></IonCol>*!/*/}
                    {/*</IonRow>*/}

                    {/*{groupedOrders['WAITING'] && groupedOrders['WAITING'].map((data) => (*/}
                    {/*    <Row*/}
                    {/*        order={data}*/}
                    {/*        pageWidth={pageWidth}*/}
                    {/*        handleReloadTable={doChanging}*/}
                    {/*        key={data._id}/>))}*/}

                    {/*</IonGrid>*/}
                    <div>This is fake data</div>

                    <IonList>
                        {groupedOrders['WAITING'] && groupedOrders['WAITING'].map((data) => (
                        <OrderItem
                            order={data}
                            pageWidth={pageWidth}
                            handleReloadTable={doChanging}
                            key={data._id} setShowBubble={setShowBubble}  showBubble={showBubble} selectedOrderId={selectedOrderId} setSelectedOrderId={setSelectedOrderId}/>))}
                    </IonList>
                </>
           )
            }
        </>
    );
};

export default OrdersTable;
