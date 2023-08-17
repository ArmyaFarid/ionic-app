import React, {ReactNode, useEffect, useRef, useState} from 'react';
import OrdersHead from './OrderBoarsHead';
import OrdersTable from './table/OrdersTable';
import FormWrapper from './forms/FormWrapper';
interface componentProps {
    searchString: string;
    setSearchString: (search : string) => void;
    formModal:boolean;
    hideForm:()=>void
}
const OrdersBoard: React.FC<componentProps> = ({searchString,setSearchString,formModal,hideForm}) => {
    const refContainer = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });
    //const [formModal, setFormModal] = useState<boolean>(false);
    const [reloadData, setReloadData] = useState<number>(0);


    const handeReloadOrders = () => {
        setReloadData(reloadData + 1);
    };

    const handleResize = () => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    };

    useEffect(() => {
        // Initial measurement on component mount
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="page-wrapper" ref={refContainer}>
            {/*<OrdersHead parentWidth={dimensions.width} showForm={showForm} searchString={searchString} setSearchString={setSearchString} />*/}
            <div className="component-body">
                <OrdersTable reloadData={reloadData} pageWidth={dimensions.width} searchString={searchString} />
                <FormWrapper parentWidth={dimensions.width} hideForm={hideForm} formModal={formModal} handeReloadOrders={handeReloadOrders} id={"null"} update={false} />
            </div>
        </div>
    );
}

export default OrdersBoard;
