import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import Api from '../../../helper/Api';
import {useQuery} from "@apollo/client";
import {GET_CATEGORIES} from "../../../graphql/queries/products";
import LoadingIndicator from "../../utils/LoadingIndicator";

interface CategorySelectorProps {
    onSelectCategory: (category: string | null) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<{ value: string; label: string } | null>(null);

    const {data,loading,error} = useQuery(GET_CATEGORIES);



    useEffect(() => {
        if (!loading ){
            console.log(data);
            // Extract unique categories using a Set
            const uniqueCategoriesSet = new Set<string>();
            data.products.forEach((product: { category: string; }) => {
                uniqueCategoriesSet.add(product.category);
            });
            const uniqueCategoriesArray = Array.from(uniqueCategoriesSet);

            setCategories(uniqueCategoriesArray);
        }

    }, [data]);

    const handleSelectCategory = (selectedOption: { value: string; label: string } | null) => {
        onSelectCategory(null);
        setSelectedCategory(selectedOption);
        onSelectCategory(selectedOption?.value ?? null); // Pass the selected category to the parent component
    };

    const categoryOptions = categories.map((category) => ({
        value: category,
        label: category,
    }));

    if (error || loading) return <LoadingIndicator isLoading={true}/>
    return (
        <Select
            className="select"
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleSelectCategory}
            isSearchable
            placeholder="Search category..."
        />
    );
};

export default CategorySelector;
