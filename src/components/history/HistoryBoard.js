import HistoryBoardHead from "./HistoryBoardHead";
import OrdersHistoryTable from "./table/OrdersHistoryTable";
import {useEffect, useRef, useState} from "react";

function HistoryBoard() {

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
            <HistoryBoardHead parentWidth={dimensions.width} searchString={searchString} setSearchString={setSearchString}/>
            <div className="component-body">
                <OrdersHistoryTable reloadData={reloadData} pageWidth={dimensions.width} searchString={searchString}/>
            </div>
        </div>
    );
}

export default HistoryBoard;