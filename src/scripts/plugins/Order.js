import { OrderItemInMobile } from '../utils/templates/OrderItemInMobile';
import { OrderItemInTable } from '../utils/templates/OrderItemInTable';

@Plugin({
  props: {
    options: {
      dataOrderListItemMobile: '[data-order-list-item-mobile]',
      dataOrderListItemDesktop: '[data-order-list-item-desktop]',
    },
    orderList: []
  }
})
export default class Order {
  init() {
    this.initDOM();
    this.getOrderList();
    this.handleDisplayOrder();
  }

  initDOM() {
    const {
      dataOrderListItemMobile,
      dataOrderListItemDesktop,
    } = this.props.options;
    this.$orderListItemMobile = this.$element.find(dataOrderListItemMobile);
    this.$orderListItemDesktop = this.$element.find(dataOrderListItemDesktop);
  }

  getOrderList() {
    this.props.orderList = JSON.parse(window.localStorage.getItem('orderList'));
  }

  handleDisplayOrder() {
    this.props.orderList.forEach((item) => {
      this.$orderListItemMobile.append(OrderItemInMobile(item));
      this.$orderListItemDesktop.append(OrderItemInTable(item));
    });
  }
}
