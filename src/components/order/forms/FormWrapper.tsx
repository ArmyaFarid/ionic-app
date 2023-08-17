import React from 'react';
import './FormWrapper.css';
import CreateOrderForm from './create/CreateOrderForm';
import UpdateForm from './update/UpdateOrderForm';

interface FormWrapperProps {
    parentWidth: number;
    formModal: boolean;
    hideForm: () => void;
    handeReloadOrders: () => void;
    update: boolean;
    id: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ parentWidth, formModal, hideForm, handeReloadOrders, update, id }) => {
    return (
        <>
            {formModal && (
                <div className="form-wrapper">
                    {!update && <CreateOrderForm hideForm={hideForm} handeReloadOrders={handeReloadOrders} />}

                    {update && <UpdateForm hideForm={hideForm} orderId={id} handeReloadOrders={handeReloadOrders} />}
                </div>
            )}
        </>
    );
};

export default FormWrapper;
