// Example function to format a price with two decimal places and the currency symbol
function formatPrice(price: number): string {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export default formatPrice;
