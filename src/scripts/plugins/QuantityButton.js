@Plugin({
  props: {
    options: {
      increaseButton: '[data-quantity-button-increase]',
      descreaseButton: '[data-quantity-button-decrease]',
      input: '[data-quantity-button-input]',
      // inputValue: 1
    },
  }
})
export default class QuantityButton {
  init() {
    this.initDOM();
    this.handleChange();
  }

  initDOM() {
    const { increaseButton, descreaseButton, input } = this.props.options;
    this.$increaseButton = this.$element.find(increaseButton);
    this.$descreaseButton = this.$element.find(descreaseButton);
    this.$input = this.$element.find(input);
  }

  /* eslint-disable */ 
  handleChange() {
    this.$input.on('click', (e) => {
      e.preventDefault();
    });

    const numberRegex = /^[0-9]+$/;
    this.$input.on('keyup', (e) => {
      e.preventDefault();
      const target = e.target.value;
      const value = parseInt(e.target.value, 10);
      if (target !== '') {
        if (!target.match(numberRegex)) {
          this.$input.val(1);
        } else {
          if (this.checkMinMaxInput(value, this.$input)) {
            this.$input.val(value);
            this.$element.data('productQuantity', value);
          } else {
            this.$input.val(1);
            this.$element.data('productQuantity', 1);
          }
        }
      }
    });
    this.$descreaseButton.on('click', (e) => {
      e.preventDefault();
      let value = parseInt(this.$input.val(), 10);
      if (this.checkMinMaxInput(value, this.$input, 'minusClick')) {
        this.$input.val(value);
        this.$element.data('productQuantity', value);
      } else {
        value -= 1;
        this.$input.val(value);
        this.$element.data('productQuantity', value);
      }
    });
    this.$increaseButton.on('click', (e) => {
      e.preventDefault();
      let value = parseInt(this.$input.val(), 10);
      if (this.checkMinMaxInput(value, this.$input, 'addClick')) {
        this.$input.val(value);
        this.$element.data('productQuantity', value);
      } else {
        value += 1;
        this.$input.val(value);
        this.$element.data('productQuantity', value);
      }
    });
  }

  
  checkMinMaxInput(value, inputElement, typeEvent = 'change') {
    switch (typeEvent) {
      case 'change' : 
        return value >= inputElement.attr('min') && value <= inputElement.attr('max') ? true : false;
        break;
      case 'addClick':
        return value >= inputElement.attr('max') ? true : false;
        break;
      case 'minusClick':
        return value <= inputElement.attr('min') ? true : false;
        break; 
      default:
        return;
    }
  }
}
