import React, { useEffect, useState } from 'react';
import formatPrice from '../../../../helper/formatter';
import Api from '../../../../helper/Api';
import * as swal from 'sweetalert2';

interface UpdateOrderProps {
    hideForm: () => void;
    handeReloadOrders: () => void;
    orderId: string;
}

const UpdateOrder: React.FC<UpdateOrderProps> = ({ hideForm, handeReloadOrders, orderId }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [order, setOrder] = useState<any | null>(null);

    const Swal = swal.default;
    const api = new Api(); // Base URI is set in the constructor

    useEffect(() => {
        api
            .fetchData('/order/' + orderId)
            .then((data) => {
                setOrder(data);
                setQuantity(data.quantity);
            })
            .catch((error) => {
                console.error('NetworkError:', error);
            });
    }, []);

    const cancelUpdate = () => {
        hideForm();
    };

    const putData = (formData: any) => {
        api
            .putData('/order/' + orderId, formData)
            .then((response) => {
                console.log(response);
                if (response.message === 'Order updated successfully!') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Commande modifié !',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    handeReloadOrders();
                    cancelUpdate();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Une erreur s'est produite",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.error('NetworkError:', error);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (e.target.name === 'qte') {
            setQuantity(parseFloat(value));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            quantity: quantity,
        };

        putData(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="order-form">
            {/* Form contents */}
            <form  onSubmit={handleSubmit} className="order-form">
                <div className="heading">
                    Modifier une commande
                </div>

                <div className="form-content">
                    <div className="input-container">
                        <label htmlFor="category-selector" className="placeholder">Categorie</label>
                        <br/>
                        <button disabled className="input-box">
                            {order ? order.category : "Loading..."}
                        </button>
                    </div>

                    <div className="input-container">
                        <label htmlFor="product-selector" className="placeholder">Produit</label>
                        <br/>
                        <button disabled className="input-box">
                            {order ? order.name+" "+order.brand: "Loading..."}

                        </button>
                    </div>

                    <div className="input-container">
                        <label htmlFor="provider-show" className="placeholder">Fournisseur</label>
                        <br/>
                        <button disabled className="input-box">
                            {order ? order.providerInfo.name : "Loading..."}
                        </button>
                    </div>

                    <div className="input-container input-row-container">
                        <div className="price">
                            <label htmlFor="provider-show" className="placeholder">Unit price</label>
                            <br/>
                            <button className="input-box-min" disabled>
                                {order ? formatPrice(parseFloat(order.unit_price)) : "Loading..."}
                            </button>
                        </div>

                        <div className="qte">
                            <label htmlFor="provider-show" className="placeholder">Quantite</label>
                            <br/>
                            <input type="number" value={quantity} onChange={handleChange} name="qte" className="input-box-min"/>
                        </div>

                        <div className="total">
                            <label htmlFor="provider-show" className="placeholder">Total</label>
                            <br/>
                            <button className="input-box-min" disabled>
                                {order ? formatPrice(parseFloat(order.unit_price)*parseFloat(String(quantity))) : "Loading..."}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="buttons-container">
                    <button type="button" className="btn-annuler" onClick={cancelUpdate}>Annuler</button>
                    <button type="submit" className="btn-submit">Valider</button>
                </div>
            </form>
        </form>
    );
};

export default UpdateOrder;
