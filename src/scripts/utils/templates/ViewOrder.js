/* eslint-disable */ 
export const ViewOrderTemplate = (order) => {
  const template = `
    <div class="ViewOrder">
      <div class="ViewOrder-details">
          <h2 class="ViewOrder-heading">Order Details</h2>
          <div class ="ViewOrder-details-content">
              <div class="ViewOrder-details-left">
                  <div class="details-Item">
                      <span class="item-tag">ORDER NUMBER</span>
                      <span class="item-value">${order.orderNumber}</span>
                  </div>
                  <div class="details-Item">
                      <span class="item-tag">EMAIL</span>
                      <span class="item-value">${order.userInformation.email}</span>
                  </div>
                  <div class="details-Item">
                      <span class="item-tag">PAYMENT METHOD</span>
                      <span class="item-value">${order.paymentType}</span>
                  </div>
                  <div class="details-Item">
                      <span class="item-tag">ORDER DATE</span>
                      <span class="item-value">${order.orderDate}</span>
                  </div>  
              </div>
              <div class="ViewOrder-details-right">
                  <div class="details-Item">
                      <span class="item-tag">DELIVERY OPTIONS</span>
                      <span class="item-value">Standard delivery</span>
                  </div>
                  <div class="details-Item">
                      <span class="item-tag">DELIVERY ADDRESS</span>
                      <span class="item-value" data-order-address></span>
                  </div>
                  <div class="details-Item">
                      <span class="item-tag">CONTACT NUMBER</span>
                      <span class="item-value">${order.userInformation.phoneNumber}</span>
                  </div>
              </div>
          </div>
      </div>
      <div class="ViewOrder-summary">
          <h2 class="ViewOrder-heading">ORDER Summary</h2>
          <div class="ViewOrder-summary-content">
              <div class="Summary-content-heading">
                  <span>PRODUCT</span>
                  <span>TOTAL</span>
              </div>
              <ul class="Summary-content-productList" data-order-list-product>
              </ul>
              <div class="Summary-content-subTotal">
                  <span class="content-tag">SUBTOTAL</span>
                  <span data-format-price>$ ${order.productInformation.totalPriceAfterDiscount + order.productInformation.totalDiscount}</span>
              </div>
              <div class="Summary-content-shippingType">
                  <span class="content-tag">SHIPPING</span>
                  <span>Free shipping</span>
              </div>  
              <div class="Summary-content-total">
                  <span class="content-tag">TOTAL</span>
                  <span data-format-price>$ ${order.productInformation.totalPriceAfterDiscount}</span>
              </div>
          </div>
      </div>
    </div>
  `;
  return template;
}