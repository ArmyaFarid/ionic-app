import {gql} from "@apollo/client";

const GET_ORDERS_BY_STATE=gql`
    query OrdersByState($state:String!) {
        ordersByState(state: $state) {
            _id
            name
            category
            brand
            unit_price
            quantity
        }
    }
`;


export {GET_ORDERS_BY_STATE};
