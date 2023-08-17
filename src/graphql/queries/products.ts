import {gql} from "@apollo/client";


const GET_CATEGORIES=gql`
    query Products {
        products {
            category
        }
    }
`;


const GET_PRODUCTS_BY_CATEGORY=gql`
    query Products($category:String!) {
        products(category:$category) {
            _id
            name
            category
            brand
            unit_price
            provider {
                _id
                name
                address
                phone
            }
        }
    }
`;

export {GET_CATEGORIES,GET_PRODUCTS_BY_CATEGORY};


