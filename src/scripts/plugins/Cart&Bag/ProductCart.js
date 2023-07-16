import { cardProductWithQuantityTemplate } from '../../utils/templates/CardProductWithQuantity';
import { CardProductInCartTemplate } from '../../utils/templates/CardProductInCart';
import { DiscountTemplate } from '../../utils/templates/DiscountTemplate';
import { couponList } from '../../utils/data/couponList';
import { keyLocalStorageList } from '../../utils/data/keyLocalStorageList';

const dataAttributeName = {
  productOption: 'productOption',
};

const { productOption } = dataAttributeName;
const { checkoutItemKey, listProductKey } = keyLocalStorageList;

@Plugin({
  props: {
    options: {
      shoppingListProduct: '[data-shopping-list-product]',
      dataNumberOfProduct: '[data-number-of-product]',
      datalistProduct: '[data-list-product]',
      dataTotal: '[data-total]',
      dataTotalPrice: '[data-total-price]',
      dataSubTotalPrice: '[data-Sub-total-price]',
      dataCoupon: '[data-coupon]',
      dataCouponInput: '[data-coupon-input]',
      dataCouponButton: '[data-coupon-button]',
      dataDiscount: '[data-total-discount]',
      dataCheckoutButton: '[data-checkout-button]',
      dataUpdateCart: '[data-update-cart]',
      dataQuantityButtonInCart: '[data-quantity-button]',
      dataProductItemInCart: '[data-product-item-in-cart]',
      dataCancelProductButton: '[data-cancel-product]',
    },
    totalPrice: 0,
    totalDiscount: 0,
    preTotalPrice: 0,
    preCoupon: {},
    cancelProductIdList: []
  }
})
export default class ProductCart {
  init() {
    this.initDOM();
    this.handleGetProductInCart();
    this.handleApplyCoupon();
    this.handleCheckout();
    this.handleUpdateCart();
    this.handleCancelProduct();
  }

  initDOM() {
    const {
      dataNumberOfProduct,
      datalistProduct,
      dataTotalPrice,
      dataSubTotalPrice,
      dataCoupon,
      dataCouponInput,
      dataCouponButton,
      dataTotal,
      dataCheckoutButton,
      dataUpdateCart
    } = this.props.options;
    this.$numberOfProduct = this.$element.find(dataNumberOfProduct);
    this.$listProduct = this.$element.find(datalistProduct);
    this.$totalPrice = this.$element.find(dataTotalPrice);
    this.$subTotalPrice = this.$element.find(dataSubTotalPrice);
    this.$coupon = this.$element.find(dataCoupon);
    this.$couponInput = this.$element.find(dataCouponInput);
    this.$couponButton = this.$element.find(dataCouponButton);
    this.$total = this.$element.find(dataTotal);
    this.$checkoutButton = this.$element.find(dataCheckoutButton);
    this.$updateButton = this.$element.find(dataUpdateCart);
  }

  /* eslint-disable */ 
  handleGetProductInCart() {
    const { dataCancelProductButton} = this.props.options;
    const listProduct = this.handleGetDataFromLocalStorage(listProductKey);

    const numberOfProduct = listProduct && listProduct.length;
    const option = this.$element.data(productOption);

    if (numberOfProduct === null) {
      this.$numberOfProduct.text('No Item');
    } else if (numberOfProduct === 1) {
      this.$numberOfProduct.text('1 item');
    } else {
      this.$numberOfProduct.text(`${numberOfProduct} items`);
    }
    listProduct?.forEach((item) => {
      option === 'shoppingBag' ? this.$listProduct.append(cardProductWithQuantityTemplate(item)) : this.$listProduct.append(CardProductInCartTemplate(item));
      if (item.productState) {
        this.props.totalPrice += (item.productPrice * (1 - item.productState)) * item.quantity;
      } else {
        this.props.totalPrice += item.productPrice * item.quantity;
      }
    });
    this.$totalPrice.text(`$ ${this.props.totalPrice}`);
    this.$subTotalPrice.text(`$ ${this.props.totalPrice}`);
    this.$cancelProductButton = this.$element.find(dataCancelProductButton);
    $('[data-quantity-button]')['quantity-button']('init');
  }

  handleApplyCoupon() {
    const { dataDiscount } = this.props.options;

    this.$couponButton.on('click', () => {
      const couponInputValue = this.$couponInput.val().trim();
      if (couponInputValue !== this.props.preCoupon.couponName) {
        if( this.props.preTotalPrice !== 0 ) {
          this.props.totalPrice = this.props.preTotalPrice;
          this.$discount.parent().remove();
        }

        const checkingCoupon = couponList.find((item) => item.couponName === couponInputValue);

        if (checkingCoupon) {
          this.props.preCoupon = checkingCoupon;
          this.props.preTotalPrice = this.props.totalPrice;
          this.props.totalDiscount = this.props.totalPrice * checkingCoupon.couponValue

          this.$total.append(DiscountTemplate);
          this.$discount = this.$element.find(dataDiscount);

          this.$discount.text(`- $ ${this.props.totalDiscount}`);

          this.props.totalPrice *= (1 - checkingCoupon.couponValue);
          this.$totalPrice.text(`$ ${this.props.totalPrice}`);
        } else {
          this.props.preCoupon = {};
          this.$discount && this.$discount.parent().remove();
          this.$totalPrice.text(`$ ${this.props.totalPrice}`);
        }
      }
      $('[data-format-price]')['format-price']('init');
    });
  }

  handleUpdateCart() {
    const { dataQuantityButtonInCart, dataProductItemInCart } = this.props.options;
    let listProduct = this.handleGetDataFromLocalStorage(listProductKey);
    this.$updateButton.on('click', (e) => {
      e.preventDefault();
      this.productIemInCart = this.$element.find(dataProductItemInCart);

      this.productIemInCart.each((index, item) => {
        this.productQuantityButtonInCart = $(item).find(dataQuantityButtonInCart);
        const updateQuantity = this.productQuantityButtonInCart.data('productQuantity');
        const productId = $(item).data('productIdInCart');

        listProduct.forEach((product) => {
          if (product.productId === productId) {
            if (updateQuantity && updateQuantity !== product.quantity) {
              product.quantity = updateQuantity;
            }
          }
        });
      });
      this.props.cancelProductIdList.forEach((id) => {
        listProduct = listProduct.filter((item) => item.productId !== id);
      });

      window.localStorage.removeItem(listProductKey);
      window.localStorage.setItem(listProductKey, JSON.stringify(listProduct));
      this.$listProduct.empty();
      this.props.totalPrice = 0;
      this.props.cancelProductIdList= [];
      $('[data-product-cart]')['product-cart']('handleGetProductInCart');
      $('[data-product-cart]')['product-cart']('handleCancelProduct');
      $('[data-format-price]')['format-price']('init');
      $('[data-shopping-cart]')['shopping-cart']('init');
    });
  }

  handleCancelProduct() {
    this.$cancelProductButton.on('click', (e) => {
      const targetParent = $(e.currentTarget).parent();
      targetParent.remove().end();
      this.props.cancelProductIdList = [...this.props.cancelProductIdList, targetParent.data('productIdInCart')];
    });
  }

  handleCheckout() {
    this.$checkoutButton.on('click', () => {
      const listProductInCart = this.handleGetDataFromLocalStorage(listProductKey);
      const totalPriceAfterDiscount = this.props.totalPrice;
      const totalDiscount = this.props.totalDiscount;
      const couponName = this.$couponInput.val();
      const checkout = {
        listProduct: listProductInCart,
        totalDiscount: totalDiscount,
        totalPriceAfterDiscount: totalPriceAfterDiscount,
        couponName: couponName
      }
      window.localStorage.setItem(checkoutItemKey, JSON.stringify(checkout));
    });
  }

  handleGetDataFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }
}
