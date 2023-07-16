/* eslint-disable */ 
export const cardProductWithQuantityTemplate = (product) => {
    const template = `
        <a href="#" class="CardProductWithQuantity" data-product-item-in-cart=${product}>
        <div class="CardProductWithQuantity-img">
            <img src='${product.productImg}' alt='${product.productName}'/>
        </div>
        <div class="CardProductWithQuantity-infor">
            <div class="CardProductWithQuantity-infor-top">
                <h5 class="productName">${product.productName}</h5>
                <p class="productColorAndSize">Black / Medium</p>
                <p class="productPrice" data-format-price>$ ${product.productPrice}</p>
                <p class="productPrice" data-product-state>${product.productState && 'Sale of '+ product.productState*100 + '%'}</p>
            </div>
            <div class="CardProductWithQuantity-infor-botttom">
                <label for="Quantity">QTY:</label>
                <div class="Quantity-input" data-quantity-button>
                    <span  class="Quantity-input-reduce" data-quantity-button-decrease>-</span>
                    <input type="number" name='quantity' value="${product.quantity}" min="0" data-quantity-button-input>
                    <span class="Quantity-input-increase" data-quantity-button-increase >+</span>
                </div>
            </div>
        </div>
        <div class="CardProductWithQuantity-infor-deleteBtn">
            <img src='images/cancelIcon.png' alt='Delete'/>
        </div>
    </a>
    `;
    return template;
}