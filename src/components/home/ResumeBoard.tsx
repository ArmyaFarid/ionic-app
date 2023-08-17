import React, { useEffect, useRef, useState } from "react";
import ResumeBoardHead from "./ResumeBoardHead";
import Api from "../../helper/Api";
import formatPrice from "../../helper/formatter";
import {IonIcon} from "@ionic/react";
import {
    bookmarksOutline,
    bookmarksSharp,
    cashOutline, cashSharp,
    chevronDownCircleOutline,
    chevronDownCircleSharp, peopleOutline, peopleSharp
} from "ionicons/icons";
import { useQuery, gql } from '@apollo/client';
import LoadingIndicator from "../utils/LoadingIndicator";
import {GET_STATS} from "../../graphql/queries/stats";

interface Stat {
    numOrders: number;
    numDeliveredOrders: number;
    totalCost: number;
    numProviders: number;
    // Add more properties if necessary
}

interface Card {
    statKey: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
    backgroundColor: string;
}

const cardData: Card[] = [
    {
        statKey: "numberOfOrdersByState",
        iosIcon: bookmarksOutline,
        mdIcon: bookmarksSharp,
        title: "Commandes",
        backgroundColor: "",
    },
    {
        statKey: "numberOfOrdersByState",
        iosIcon: chevronDownCircleOutline,
        mdIcon: chevronDownCircleSharp,
        title: "Livré",
        backgroundColor: "#FEF6FB",
    },
    {
        statKey: "totalCostOfPayedOrders",
        iosIcon: cashOutline,
        mdIcon: cashSharp,
        title: "Depense total",
        backgroundColor: "#FEFBEC",
    },
    {
        statKey: "numberOfProviders",
        iosIcon: peopleOutline,
        mdIcon: peopleSharp,
        title: "fournisseurs",
        backgroundColor: "#F6C762",
    },
];

function ResumeBoard() {
    const refContainer = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [stat, setStat] = useState<any | null>(null);

    const { loading:statLoading, error:statError, data:statData } = useQuery(GET_STATS,{
        variables: { state:"WAITING" },
    });

    // useEffect(() => {
    //     const api = new Api(); // Create an instance of the Api class
    //
    //     api.fetchData('/statistics')
    //         .then((data: Stat) => {
    //             console.log(data);
    //             setStat(data);
    //         })
    //         .catch((error: Error) => {
    //             console.error('NetworkError:', error);
    //         });
    //
    //     // Initial measurement on component mount
    //     handleResize();
    //
    //     // Event listener for window resize
    //     window.addEventListener('resize', handleResize);
    //
    //     // Cleanup the event listener on component unmount
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    useEffect(() => {
        setStat({
            numberOfProviders: 12,
            numberOfOrdersByState: 0,
            totalCostOfPayedOrders: 0,
            ordersCount: 1
        });
    }, []);





    if (statLoading)  return <LoadingIndicator isLoading={true}></LoadingIndicator>;

    return (
        <div className="page-wrapper" ref={refContainer}>
            <ResumeBoardHead parentWidth={dimensions.width.toString()} />
            <div className="component-body">
                <div className="card-container resume-card-container">

                    {cardData.map((card, index) => (

                        <div className="card" style={{ backgroundColor: card.backgroundColor }} key={index}>
                            <div className="card-head">
                                <div className="icon">
                                    {/* Use card.iosIcon and card.mdIcon properties */}
                                    <IonIcon aria-hidden="true" slot="start" ios={card.iosIcon} md={card.mdIcon} />
                                </div>
                                <h4>{card.title}</h4>
                            </div>
                            <div className="card-data">
                                <h3>
                                    {stat ? card.statKey === "totalCostOfPayedOrders" ? formatPrice(stat[card.statKey as keyof Stat]) : stat[card.statKey as keyof Stat] : "---"}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ResumeBoard;

