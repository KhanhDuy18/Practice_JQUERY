/* eslint-disable */
export const OrderItemInTable = (order) => {
  const template = `
    <div class="AccountTableItem-content-item">
      <span data-order-item-id>${order.orderNumber}</span>
      <span>${order.orderDate}</span>
      <span>${order.orderStatus}</span>
      <span data-format-price>$ ${order.productInformation.totalPriceAfterDiscount}</span>
      <a href="http://localhost:5000/ViewOrder.html?id=${order.orderNumber}">View Order</a>
    </div>
  `;
  return template;
};