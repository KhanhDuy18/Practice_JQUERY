@Plugin({
})
export default class FormatPrice {
  init() {
    this.handleFormatPrice();
  }

  handleFormatPrice() {
    const value = this.$element.text();
    const formatPrice = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // this.$element.text(`$ ${formatPrice}`);
    this.$element.text(formatPrice);
  }
}
