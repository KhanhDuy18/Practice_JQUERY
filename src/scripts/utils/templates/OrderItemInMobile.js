/* eslint-disable */
export const OrderItemInMobile = (order) => {
  const template = `
    <div class="AccountInforItem">
      <div class="AccountInforItem-option">
          <span class="infor-tag">ORDER NUMBER</span>
          <span class="infor-value" data-order-item-id>${order.orderNumber}</span>
      </div>
      <div class="AccountInforItem-option">
          <span class="infor-tag">DATE</span>
          <span class="infor-value">${order.orderDate}</span>
      </div>
      <div class="AccountInforItem-option">
          <span class="infor-tag">STATUS</span>
          <span class="infor-value">${order.orderStatus}</span>
      </div>
      <div class="AccountInforItem-option">
          <span class="infor-tag">TOTAL</span>
          <span class="infor-value" data-format-price>$ ${order.productInformation.totalPriceAfterDiscount}</span>
      </div>
      <div class="AccountInforItem-option">
            <span class="infor-tag">ACTIONS</span>
            <a href="http://localhost:5000/ViewOrder.html?id=${order.orderNumber}">View Order</a>
      </div>
    </div>
  `;
  return template;
};