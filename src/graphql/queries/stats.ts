import {gql} from "@apollo/client";

const  GET_STATS = gql`
    query OrderStats($state: String!) {
        orderStats(state: $state) {
            numberOfProviders
            numberOfOrdersByState
            totalCostOfPayedOrders
        }
    }
`;


const  GET_PROVIDERS = gql`
    query Providers {
        providers {
            _id
            name
            address
            phone
        }
    }
`;

export {GET_STATS};
