import Api from "../../../helper/Api"
import {useEffect, useState} from "react";
import ServerErrorComponent from "../../utils/ServerErrorComponent";
import LoadingIndicator from "../../utils/LoadingIndicator";
import formatPrice from "../../../helper/formatter";
function PaymentHistoryTable({reloadData,pageWidth,searchString}) {

    const [paidOrders, setPaidOrders] = useState([]);
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

    const api = new Api(); // Base URI is set in the constructor

    useEffect(() => {
        setIsLoading(true);
        api.fetchData('/order?name='+searchString+"&isPaid=true")
            .then((data) => {setPaidOrders(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Les données ne peuvent pas être récupérées, réessayez plus tard');
                console.error('NetworkError:', error);
            });

    }, [changing,reloadData,searchString]);



    return (
        <>
            {error && <div><ServerErrorComponent retryFetch={retryFetch}/></div>}

            {
                !error &&
                <table>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Categorie</th>
                        <th>Prix Unit</th>
                        <th>Quantite</th>
                        <th>Prix Total</th>
                        <th></th>
                    </tr>
                    </thead>

                    {
                        !isLoading &&
                        <tbody>
                        {
                            paidOrders.length > 0 && paidOrders.map((paidOrder)=>(
                                <tr key={paidOrder._id}>
                                    <td>{paidOrder.name}</td>
                                    <td>{paidOrder.category}</td>
                                    <td>{formatPrice(paidOrder.unit_price)}</td>
                                    <td>{paidOrder.quantity}</td>
                                    <td>{formatPrice(parseFloat(paidOrder.unit_price)*parseFloat(paidOrder.quantity))}</td>
                                    <td>Payé</td>
                                </tr>
                            ))
                        }
                        {
                            paidOrders.length <= 0 &&
                                <tr>
                                    <td colSpan="6" style={{backgroundColor:"transparent",border:0,color:"#ACACAC"}}>Pas de donnée disponible pour le moment..</td>
                                </tr>
                        }
                        </tbody>
                    }
                    <LoadingIndicator isLoading={isLoading}/>
                </table>
            }
        </>
    );
}

export default PaymentHistoryTable;