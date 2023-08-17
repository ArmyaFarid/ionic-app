import {gql} from "@apollo/client";

const CREATE_ORDER=gql`
    mutation CreateOrder($productId:String!,$quantity:Int) {
        createOrder(productId:$productId , quantity: $quantity) {
            _id
            name
            category
            brand
            unit_price
            quantity
        }
    }
`;


export {CREATE_ORDER};
