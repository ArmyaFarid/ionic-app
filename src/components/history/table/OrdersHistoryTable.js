import OrderRow from "./OrderRow";
import Api from "../../../helper/Api"
import {useEffect, useState} from "react";
import ServerErrorComponent from "../../utils/ServerErrorComponent";
import LoadingIndicator from "../../utils/LoadingIndicator";

function OrdersHistoryTable({reloadData,pageWidth,searchString}) {

    const [groupedOrders, setGroupedOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [changing, setChanging] = useState(1);
    const [error, setError] = useState(null);

    function doChanging() {
        setChanging(changing + 1);
    }


    const retryFetch = () => {
        doChanging();
        setError(null);
    }

    // Function to group orders by state
    const groupOrdersByState = (orders) => {
        const statesOrder = ["WAITING", "CANCEL", "PAYMENT" ,"DELIVERING","DELIVERED"];
        return statesOrder.reduce((acc, state) => {
            acc[state] = orders.filter((order) => order.state === state);
            return acc;
        }, {});
    };

    const api = new Api(); // Base URI is set in the constructor

    useEffect(() => {
        setIsLoading(true);
        api.fetchData('/order?name='+searchString)
            .then((data) => {
                setGroupedOrders(groupOrdersByState(data));
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Les données ne peuvent pas être récupérées, réessayez plus tard');
                console.error('NetworkError:', error);
            });

    }, [changing, reloadData, searchString]);


    return (
        <>
            {error && <div><ServerErrorComponent retryFetch={retryFetch}/></div>}

            {
                !error &&
                <table>
                    <thead>
                    <tr className="table-main-head">
                        <th>Nom</th>
                        <th>Categorie</th>
                        <th>Prix Unit</th>
                        <th>Quantite</th>
                        <th>Prix Total</th>
                        <th>État d'acquisition</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    {
                        !isLoading &&
                        <>
                            <thead className="table-section-label-thead">
                            <tr className="table-section-label">
                                <th colSpan="7">Livré</th>
                            </tr>
                            </thead>

                            <tbody>

                            {groupedOrders["DELIVERED"].length > 0  && groupedOrders["DELIVERED"].map((data) => (
                                    <OrderRow order={data} doChanging={doChanging}  pageWidth={pageWidth} handleReloadTable={doChanging} key={data._id}/>
                                )
                            )}

                            {groupedOrders["DELIVERED"].length <= 0 &&
                                <tr className="table-section-label">
                                    <td colSpan="7" style={{backgroundColor:"transparent",border:0,color:"#ACACAC"}}>Aucune commande livré a ete trouve</td>
                                </tr>
                            }



                            </tbody>

                            <thead className="table-section-label-thead">
                            <tr className="table-section-label">
                                <th colSpan="7">Annullé</th>
                            </tr>
                            </thead>

                            <tbody>


                            {groupedOrders["CANCEL"].length > 0 && groupedOrders["CANCEL"].map((data) => (
                                    <OrderRow order={data} doChanging={doChanging}  pageWidth={pageWidth} handleReloadTable={doChanging} key={data._id}/>
                                )
                            )}
                            {groupedOrders["CANCEL"].length <= 0 &&
                                <tr className="table-section-label">
                                    <td colSpan="7" style={{backgroundColor:"transparent",border:0,color:"#ACACAC"}}>Aucune commande annule trouvee</td>
                                </tr>
                            }
                            </tbody>

                        </>
                    }
                    <LoadingIndicator isLoading={isLoading}/>
                </table>
            }
        </>
    );
}

export default OrdersHistoryTable;