import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import Api from '../../../helper/Api';
import {useQuery} from "@apollo/client";
import {GET_PRODUCTS_BY_CATEGORY} from "../../../graphql/queries/products";
import LoadingIndicator from "../../utils/LoadingIndicator";


interface Info {
    _id: string;
    name: string;
    brand: string;
    unit_price: number;
}

interface Product {
    _id: string;
    providerId: string;
    providerName: string;
    product: Info;
}


type Provider = {
    _id: string;
    name: string;
    address: string;
    phone: string;
};

type Product2 = {
    _id: string;
    name: string;
    category: string;
    brand: string;
    unit_price: number;
    provider: Provider;
};


interface ProductSelectorProps {
    selectedCategory: string | null;
    selectedProduct: any | null;
    setSelectedProduct: (product: any | null) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedCategory, selectedProduct, setSelectedProduct }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const [products2, setProducts2] = useState<Product2[]>([]);

    const api = new Api(); // Base URI is set in the constructor

    const {data , loading , error,refetch}= useQuery(GET_PRODUCTS_BY_CATEGORY,{
        variables: {
            category: selectedCategory === null ? 'dd' : selectedCategory,
        },
    });

    useEffect(() => {
        setSelectedProduct(null);
        setProducts([]);
        if (selectedCategory) {
            refetch({category: selectedCategory}).then((d)=> {
                console.log(d.data.products);
                setProducts2(d.data.products);
            });
            console.log("gooo");
            api
                .fetchData('/provider/product/' + selectedCategory)
                .then((data) => {
                    setProducts(data);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [selectedCategory]);

    if (error) return <div>{error.message}</div>

    if (error || loading) return <LoadingIndicator isLoading={true}/>




    const handleSelectProduct = (selectedOption:any) => {
        setSelectedProduct(selectedOption);
    };

    const categoryOptions = products.map((product) => ({
        value: product._id,
        label: product.product.name+"--"+product.product.brand+"--from "+product.providerName + "--price "+product.product.unit_price
    }));

    const categoryOptions2 = products2.map((product: Product2) => {
        let label = product.name + "--" + product.brand;

        if (product.provider) {
            label += "--from " + product.provider.name + "--price " + product.unit_price;
        }

        return {
            value: product._id,
            label: label
        };
    });


    return (
        <Select
            className="select"
            options={categoryOptions2}
            value={selectedProduct}
            onChange={handleSelectProduct}
            isSearchable
            placeholder="Search category..."
        />
    );
};

export default ProductSelector;
