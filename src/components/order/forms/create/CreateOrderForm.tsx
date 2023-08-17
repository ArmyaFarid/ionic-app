import React, { useState } from 'react';
import './CreateOrderForm.css';
import formatPrice from '../../../../helper/formatter';

import CategorySelector from '../../select/CategorySelector';
import ProductSelector from '../../select/ProductSelector';
import Api from '../../../../helper/Api';
import * as swal from 'sweetalert2';
import {useMutation} from "@apollo/client";
import {CREATE_ORDER} from "../../../../graphql/mutations/orders";


interface CreateOrderProps {
    hideForm: () => void;
    handeReloadOrders: () => void;
}

const CreateOrder: React.FC<CreateOrderProps> = ({ hideForm, handeReloadOrders }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const Swal = swal.default;

    const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);

    const handleSelCategory = (categoryName: string|null):void => {
        setSelectedCategory(categoryName);
    };

    const cancelCreate = () => {
        hideForm();
    };

    function extractProviderName(text:string) {
        // Find the index of "from" in the text (case-insensitive)
        const fromIndex = text.toLowerCase().indexOf('from');

        // If "from" is found and there is text after it, extract the provider name
        if (fromIndex !== -1 && fromIndex + 5 < text.length) {
            const providerStartIndex = fromIndex + 5; // Skip the length of "from" and a space
            const providerEndIndex = text.indexOf('--', providerStartIndex); // Find the end index of the provider name
            if (providerEndIndex !== -1) {
                return text.slice(providerStartIndex, providerEndIndex).trim();
            }
        }

        return null; // Return null if "from" or provider name is not found
    }

    function extractPrice(text:string):number|null {

        // Find the index of the word "from" in the text (case-insensitive)
        const fromIndex = text.toLowerCase().indexOf('price');

        // If "from" is found, return the text after it, else return null
        return fromIndex !== -1 ? parseFloat(text.slice(fromIndex + 5).trim()) : null;

    }


    const api = new Api(); // Base URI is set in the constructor

    const postData = (formData: any) => {
        api
            .postData('/order/', formData)
            .then((response) => {
                if (response.message === 'Post saved successfully!') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Commande ajouté !',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    handeReloadOrders();
                    cancelCreate();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Erreur lors de la commande",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.error('NetworkError:', error);
            });
    };

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(selectedProduct){
            const formData ={
                productId: selectedProduct.value,
                quantity:quantity
            }

            createOrder(({ variables: { productId: selectedProduct.value , quantity:Number(quantity) }}));

            postData(formData);
        }else{
            console.log("Form is empty");
            alert("Remplir tout le formulaire");
        }

    };

    const handleChange = (e: { target: { value: any; name: string; }; }) => {
        const value = e.target.value;
        if(e.target.name==="qte"){
            setQuantity(value);
        }
    };

    // Rest of the code remains the same

    return (
        <form onSubmit={handleSubmit} className="order-form">
            <div className="heading">
                Ajouter une commande
            </div>

            <div className="form-content">
                <div className="input-container">
                    <label htmlFor="category-selector" className="placeholder">Categorie</label>
                    <CategorySelector  onSelectCategory={handleSelCategory} />
                </div>

                <div className="input-container">
                    <label htmlFor="product-selector" className="placeholder">Produit</label>
                    <ProductSelector selectedCategory={selectedCategory}  selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
                </div>

                <div className="input-container">
                    <label htmlFor="provider-show" className="placeholder">Fournisseur</label>
                    <br/>
                    <button disabled className="input-box">
                        {selectedProduct ? extractProviderName(selectedProduct.label) : "Choisir d'abord"}
                    </button>
                </div>

                <div className="input-container input-row-container">
                    <div className="price">
                        <label htmlFor="provider-show" className="placeholder">Unit price</label>
                        <br/>
                        <button className="input-box-min" disabled>
                            {selectedProduct ? formatPrice(Number(extractPrice(selectedProduct.label))) : "Choisir d'abord"}
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
                            {selectedProduct ? formatPrice(Number(extractPrice(selectedProduct.label || 0))*parseFloat(quantity.toString())) : "Choisir d'abord"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="buttons-container">
                <button type="button" className="btn-annuler" onClick={cancelCreate} >Annuler</button>
                <button type="submit" className="btn-submit" disabled={selectedProduct==null}>Valider</button>
            </div>
        </form>
    );
};

export default CreateOrder;
