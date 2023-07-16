import { InformationProductInOrder } from '../utils/templates/InformationProductInOrder';
import { ErrorInputMessageInput } from '../utils/templates/errorInputMessage';
import { couponList } from '../utils/data/couponList';
import { keyLocalStorageList } from '../utils/data/keyLocalStorageList';

const valueCSS = {
  errorColor: 'red',
  normalColor: 'black'
};

const classes = {
  disableButton: 'disableButton',
  errorInput: 'errorInput',
};

const inputType = {
  email: 'email',
  phoneNumber: 'phoneNumber'
};

const errorMessage = {
  invalidEmail: 'Invalid Email',
  invalidPhoneNumber: 'Invalid PhoneNumber',
  missField: 'Please enter your'
};

const { errorColor, normalColor } = valueCSS;
const { disableButton } = classes;
const { email, phoneNumber } = inputType;
const { invalidEmail, invalidPhoneNumber, missField } = errorMessage;
const { checkoutItemKey, orderListKey, listProductKey } = keyLocalStorageList;

@Plugin({
  props: {
    options: {
      dataCheckoutCoupon: '[data-checkout-coupon]',
      dataCheckoutForm: '[data=checkout-form]',
      dataCheckoutCouponInput: '[data-checkout-coupon-input]',
      dataCheckoutCouponButton: '[data-checkout-coupon-button]',
      dataCheckoutOrderProduct: '[data-checkout-order-product]',
      dataCheckoutOrderPrice: '[data-checkout-order-price]',
      dataCheckoutOrderSubPrice: '[data-checkout-order-sub-price]',
      dataCheckoutPaymentType: '[data-checkout-payment-type]',
      dataCheckoutInformationForm: '[data-checkout-information-form]',
      dataPlaceOrderButton: '[data-place-order-button]',
      dataErrorInputMessage: '[data-error-input-message]'
    },
    checkoutItem: {},
    checkFlag: true,
    preTotalPrice: 0,
    preCoupon: {},
  }
})
export default class Checkout {
  init() {
    this.initDOM();
    this.handleDisplayCheckoutItem();
    this.handlePlaceOrder();
    this.handleSelect();
    this.handleApplyCoupon();
  }

  initDOM() {
    const {
      dataCheckoutForm,
      dataCheckoutCouponInput,
      dataCheckoutCouponButton,
      dataCheckoutOrderProduct,
      dataCheckoutOrderPrice,
      dataCheckoutPaymentType,
      dataCheckoutInformationForm,
      dataCheckoutOrderSubPrice,
      dataPlaceOrderButton
    } = this.props.options;

    this.$checkoutForm = this.$element.find(dataCheckoutForm);
    this.$checkoutCouponInput = this.$element.find(dataCheckoutCouponInput);
    this.$checkoutCouponButton = this.$element.find(dataCheckoutCouponButton);
    this.$checkoutOrderProduct = this.$element.find(dataCheckoutOrderProduct);
    this.$checkoutOrderPrice = this.$element.find(dataCheckoutOrderPrice);
    this.$checkoutOrderSubPrice = this.$element.find(dataCheckoutOrderSubPrice);
    this.$checkoutPaymentType = this.$element.find(dataCheckoutPaymentType);
    this.$checkoutInformationForm = this.$element.find(dataCheckoutInformationForm);
    this.$placeOrderButton = this.$element.find(dataPlaceOrderButton);
    this.$inputUserInformation = this.$checkoutInformationForm.find('input');
    this.$emailInput = this.$checkoutInformationForm.find(`input[name="${email}"]`);
    this.$phoneNumberInput = this.$checkoutInformationForm.find(`input[name="${phoneNumber}"]`);
    this.$inputUserInformation = this.$checkoutInformationForm.find('input');
    this.$selectUserInformation = this.$checkoutInformationForm.find('select');
  }

  handleDisplayCheckoutItem() {
    this.props.checkoutItem = this.handleGetDataFromLocalStorage(checkoutItemKey);
    if (this.props.checkoutItem.couponName) {
      this.$checkoutCouponButton.addClass(disableButton);
      this.$checkoutCouponInput.val(this.props.checkoutItem.couponName);
    }
    this.$checkoutOrderPrice.text(`$ ${this.props.checkoutItem.totalPriceAfterDiscount}`);
    this.$checkoutOrderSubPrice.text(`$ ${this.props.checkoutItem.totalDiscount + this.props.checkoutItem.totalPriceAfterDiscount}`);
    this.props.checkoutItem.listProduct.forEach((item) => {
      this.$checkoutOrderProduct.append(InformationProductInOrder(item));
    });
  }

  handleApplyCoupon() {
    this.$checkoutCouponButton.on('click', (e) => {
      e.preventDefault();
      const couponInputValue = this.$checkoutCouponInput.val().trim();
      if (couponInputValue !== this.props.preCoupon.couponName) {
        if (this.props.preTotalPrice !== 0) {
          this.props.checkoutItem.totalPriceAfterDiscount = this.props.preTotalPrice;
        }

        const checkingCoupon = couponList.find((item) => item.couponName === couponInputValue);

        if (checkingCoupon) {
          this.props.preCoupon = checkingCoupon;
          this.props.preTotalPrice = this.props.checkoutItem.totalPriceAfterDiscount;

          this.props.checkoutItem.totalPriceAfterDiscount *= (1 - checkingCoupon.couponValue);
          this.$checkoutOrderPrice.text(`$ ${this.props.checkoutItem.totalPriceAfterDiscount}`);
          this.$checkoutOrderSubPrice.text(`$ ${this.props.preTotalPrice}`);
        } else {
          this.props.preCoupon = {};
          this.$checkoutOrderPrice.text(`$ ${this.props.checkoutItem.totalPriceAfterDiscount}`);
          this.$checkoutOrderSubPrice.text(`$ ${this.props.checkoutItem.totalPriceAfterDiscount}`);
        }
      }
      $('[data-format-price]')['format-price']('init');
    });
  }
  /* eslint-disable */ 
  handlePlaceOrder() {
    this.$placeOrderButton.on('click', (e) => {
      e.preventDefault();
      const orderChecking = this.getAndValidateUserInformation();
      const paymentType = this.$checkoutPaymentType.find('input:checked').val();
      const order = {
        orderNumber: `Od${Date.now()}`,
        orderDate: new Date().toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        orderStatus: 'Processing',
        productInformation: this.props.checkoutItem,
        userInformation: orderChecking.userInformation,
        paymentType
      };
      if (orderChecking.finalChecking) {
        let listOrder = this.handleGetDataFromLocalStorage(orderListKey);
        if (listOrder) {
          window.localStorage.setItem(orderListKey, JSON.stringify([...listOrder, order]));
        } else {
          window.localStorage.setItem(orderListKey, JSON.stringify([order]));
        }
        this.$checkoutInformationForm.parent()[0].reset();
        window.localStorage.removeItem(listProductKey);
        window.localStorage.removeItem(checkoutItemKey);
        $('[data-shopping-cart]')['shopping-cart']('init');
        window.location.href="http://localhost:5000/AccountOrder.html";
      }
    });
  }

  getAndValidateUserInformation() {
    let finalChecking = true;
    const userInformation = {};
    finalChecking = this.handleErrorMessage(this.$selectUserInformation, userInformation, 'select');
    finalChecking = this.handleErrorMessage(this.$inputUserInformation, userInformation);
    if (userInformation.email) {
      const emailChecking = this.validateInputFiled(userInformation.email);
      if (!emailChecking) finalChecking = false;
      this.applyValidationInput(this.$emailInput, emailChecking, invalidEmail);
    }
    if (userInformation.phoneNumber) {
      const phoneNumberChecking = this.validateInputFiled(userInformation.phoneNumber, phoneNumber);
      if (!phoneNumberChecking) finalChecking = false;
      this.applyValidationInput(this.$phoneNumberInput, phoneNumberChecking, invalidPhoneNumber);
    }
    return {
      finalChecking,
      userInformation,
    };
  }

  handleErrorMessage( appliedElement, userInformation, type = 'input') {
    const { dataErrorInputMessage } = this.props.options;
    let checkFullField = true;
    appliedElement.each((index, item) => {
      const parentItem = $(item).parent();

      if (type === 'input') {
        userInformation[$(item).attr('name')] = $(item).val();
      } else {
        userInformation[$(item).attr('name')] = $(item).find('option:checked').text();
      }

      if ($(item).val() === '') {
        checkFullField = false;
        if (type === 'input') {
          parentItem.find('label').css('color', errorColor);
        } else {
          $(item).css('color', errorColor);
        }
        if (parentItem.find(dataErrorInputMessage).length === 0) {
          parentItem.append(ErrorInputMessageInput(`${missField} ${$(item).attr('name')}.`));
        }
      } else {
        if (type === 'input') {
          parentItem.find('label').css('color', normalColor);
        } else {
          $(item).css('color', normalColor);
        }
        parentItem.find(dataErrorInputMessage).remove().end();
      }
    });
    return checkFullField;
  }

  validateInputFiled(valueInput, type = email){
    const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    const phoneNumberRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return emailRegex.test(valueInput) || phoneNumberRegex.test(valueInput);
  }

  applyValidationInput(appliedElement, check, message) {
    const { dataErrorInputMessage } = this.props.options;
    const parentElement = appliedElement.parent();
    if (!check) {
      parentElement.append(ErrorInputMessageInput(message));
      parentElement.find('label').css('color', errorColor);
    } else {
      parentElement.find(dataErrorInputMessage).remove().end();
      parentElement.find('label').css('color', normalColor);
    }
  }

  handleSelect() {
    this.$selectUserInformation.on('click', () => {
      this.$selectUserInformation.css('color', normalColor);
    });
  }

  handleGetDataFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }
}
