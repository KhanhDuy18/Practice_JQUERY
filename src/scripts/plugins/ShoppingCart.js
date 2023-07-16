@Plugin({
  props: {
    options: {
      dataShoppingCartDisplay: '[data-shopping-cart-display]',
    }
  }
})
export default class ShoppingCart {
  init() {
    this.initDOM();
    this.handleDisplay();
  }

  initDOM() {
    const { dataShoppingCartDisplay } = this.props.options;
    this.$display = this.$element.find(dataShoppingCartDisplay);
  }

  /* eslint-disable */ 
  handleDisplay() {
    const listProduct = JSON.parse(window.localStorage.getItem('listProduct'));
    listProduct && this.$display.text(listProduct.length);
  }
}
