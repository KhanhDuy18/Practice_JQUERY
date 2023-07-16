import { ViewOrderTemplate } from '../utils/templates/ViewOrder';
import { InformationProductInOrder } from '../utils/templates/InformationProductInOrder';

@Plugin({
  props: {
    options: {
      dataOrderAddress: '[data-order-address]',
      dataOrderListProduct: '[data-order-list-product]',
    }
  }
})
export default class OrderView {
  init() {
    // this.initDOM();
    this.handleDisplayOrder();
  }

  handleDisplayOrder() {
    const {
      dataOrderAddress,
      dataOrderListProduct,
    } = this.props.options;

    const orderId = window.location.search.substring(4);
    const listOrder = JSON.parse(window.localStorage.getItem('orderList'));

    const order = listOrder.find((item) => item.orderNumber === orderId);
    const orderInformationUser = order.userInformation;
    const orderListProduct = order.productInformation.listProduct;
    const orderAddress = `${orderInformationUser.address}, ${orderInformationUser.district}, ${orderInformationUser.city}`;

    this.$element.append(ViewOrderTemplate(order));

    this.$orderAddress = this.$element.find(dataOrderAddress);
    this.$orderAddress.text(orderAddress);

    this.$orderListProduct = this.$element.find(dataOrderListProduct);
    orderListProduct.forEach((item) => {
      this.$orderListProduct.append(InformationProductInOrder(item));
    });
  }
}
