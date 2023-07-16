/* eslint-disable */ 
export const CardProductInCartTemplate = (product) => {
  const template = `
      <div href="#" class="CardProductInCart" data-product-item-in-cart data-product-id-in-cart=${product.productId}>
        <div class="CardProductInCart-img">
            <img src= '${product.productImg}' alt= '${product.productName}' />
        </div>
        <div class="CardProductInCart-infor">
            <div class="CardProductInCart-infor-top">
                <h5 class="productName">${product.productName}</h5>
                <p class="productColorAndSize">Black / Medium</p>
                <p class="productPrice" data-format-price>$ ${product.productPrice}</p>
                <p class="productPrice" data-product-state>${product.productState && 'Sale of '+ product.productState*100 + '%'}</p>
            </div>
            <div class="CardProductInCart-infor-botttom">
                    <div class="Quantity-input" data-quantity-button> 
                        <span data-quantity-button-decrease> - </span>
                        <input type="text" name='quantity' value="${product.quantity}" min="1" max='20' data-quantity-button-input>
                        <span data-quantity-button-increase> + </span>
                    </div>
                    <select name="Quantity">
                        <option value="1" selected >1</option>
                    </select>       
            </div>
        </div>
        <div class="CardProductInCart-infor-deleteBtn" data-cancel-product>
            <img src='images/cancelIcon.png' alt='Delete'/>
        </div>
      </div>
    `;
  return template;
}