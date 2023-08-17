import PayementBoardHead from "./PayementBoardHead";
import PaymentHistoryTable from "./table/PaymentHistoryTable";
import {useEffect, useRef, useState} from "react";

function PaymentBoard() {

    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [reloadData, setReloadData] = useState(0);
    const [searchString, setSearchString] = useState('');




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
        <div className="page-wrapper"  ref={refContainer}>
            <PayementBoardHead parentWidth={dimensions.width} searchString={searchString} setSearchString={setSearchString}/>
            <div className="component-body">
                <PaymentHistoryTable reloadData={reloadData} pageWidth={dimensions.width} searchString={searchString}/>
            </div>
        </div>
    );
}

export default PaymentBoard;