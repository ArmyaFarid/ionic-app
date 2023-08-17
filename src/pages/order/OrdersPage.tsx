import React, {ReactNode, useState} from 'react';
import './OrderPage.css';
import OrdersBoard from "../../components/order/OrdersBoard";
import PageWrapper from "../PageWrapper";
import Segment from "../../components/app-segment/Segment";

const OrdersPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchString, setSearchString] = useState<string>('');
    const [formModal, setFormModal] = useState<boolean>(false);


    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        console.log(value);
        // Perform search or filtering logic using the 'value' parameter
    };

    const showForm = ()=>{
        setFormModal(true);
        console.log("show");
    }

    const hideForm = () => {
        setFormModal(false);
    };

    const pageOption = {
        pageTitle: 'Home',
        onSearchChange: handleSearchChange, // Make sure to define handleSearchChange
        hasButton: true,
        showForm: showForm, // Make sure to define showForm
    };

    const [selectedSegment, setSelectedSegment] = useState('all');

    const segments = [
        { title: 'WAITING', value: 'WAITING' },
        { title: 'CANCEL', value: 'CANCEL' },
        { title: 'PAYMENT', value: 'PAYMENT' },
        { title: 'DELIVERING', value: 'DELIVERING' },
        { title: 'DELIVERED', value: 'DELIVERED' },
    ];

    const handleSelectSegment = (segment: string) => {
        setSelectedSegment(segment);
        console.log(segment);
    };

    return (
        <PageWrapper option={pageOption}>
            <Segment selectSegment={selectedSegment} segments={segments} onSelectSegment={handleSelectSegment} />
            <OrdersBoard  searchString={searchValue} setSearchString={handleSearchChange} formModal={formModal} hideForm={hideForm}/>
        </PageWrapper>
    );
}

export default OrdersPage;
