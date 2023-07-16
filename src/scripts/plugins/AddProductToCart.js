import { keyLocalStorageList } from '../utils/data/keyLocalStorageList';

const { listProductKey } = keyLocalStorageList;

@Plugin({
  props: {
    options: {
      dataProductQuantity: '[data-quantity-button]',
      dataAddToCartButton: '[data-add-to-cart-button]'
    }
  }
})
export default class AddProductToCart {
  init() {
    this.initDOM();
    this.handleAdd();
  }

  initDOM() {
    const { dataProductQuantity, dataAddToCartButton } = this.props.options;
    this.$quantityInput = this.$element.find(dataProductQuantity);
    this.$addBtn = this.$element.find(dataAddToCartButton);
  }

  handleAdd() {
    this.$addBtn.on('click', (e) => {
      e.preventDefault();
      const newProduct = {
        productId: this.$quantityInput.data('productId'),
        productName: this.$quantityInput.data('productName'),
        productImg: this.$quantityInput.data('productImg'),
        productPrice: this.$quantityInput.data('productPrice'),
        productState: this.$quantityInput.data('productState'),
        quantity: this.$quantityInput.data('productQuantity')
      };
      let listProduct = JSON.parse(window.localStorage.getItem(listProductKey));
      if (listProduct) {
        if (listProduct.some(item => item.productId === newProduct.productId)) {
          listProduct = listProduct.map((item) => {
            if (item.productId === newProduct.productId) {
              item.quantity += newProduct.quantity;
            }
            return item;
          });
          window.localStorage.setItem(listProductKey, JSON.stringify(listProduct));
        } else {
          window.localStorage.setItem(listProductKey, JSON.stringify([...listProduct, newProduct]));
        }
      } else {
        window.localStorage.setItem(listProductKey, JSON.stringify([newProduct]));
      }
      $('[data-shopping-cart]')['shopping-cart']('init');
    });
  }
}
