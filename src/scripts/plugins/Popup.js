const attributeName = {
  sliderWrapper: 'data-slider-wrapper',
  attrPopupOverlay: 'data-popup-overlay',
  attrPopupSlideMain: 'data-popup-slide-main',
  attrPopupSlideSub: 'data-popup-slide-sub',
};

const classes = {
  active: 'active',
  popupImgProduct: 'PopupImgProduct',
  popupImgProductMain: 'PopupImgProduct-Main',
  popupImgProductSub: 'PopupImgProduct-Sub',
  popupImgProductSubProductName: 'PopupImgProduct-Sub-productName',
  popupImgProductSubSlider: 'PopupImgProduct-Sub-Slider',
  popupOverlayClass: 'popup-overlay',
};

const {
  attrPopupOverlay,
  attrPopupSlideMain,
  attrPopupSlideSub
} = attributeName;

const {
  active,
  popupImgProduct,
  popupImgProductMain,
  popupImgProductSub,
  popupImgProductSubProductName,
  popupImgProductSubSlider,
  popupOverlayClass
} = classes;

const templatePopup = `
  <div class='${popupImgProduct} ${active}' data-popup-element>
    <div class=${popupImgProductMain} ${attrPopupSlideMain} data-slider-wrapper-popup></div>
    <div class=${popupImgProductSub} >
      <h3 class=${popupImgProductSubProductName}>HAL EARRINGS</h3>
      <div class=${popupImgProductSubSlider} ${attrPopupSlideSub} data-slider-wrapper-small-popup></div>
    </div>
  </div>  
`;
const templateOverlay = `<div class=${popupOverlayClass} ${attrPopupOverlay}></div>`;

@Plugin({
  props: {
    options: {
      popup: '[data-popup-element]',
      popupOverlay: '[data-popup-overlay]',
      availableSlideItem: '[data-available-slide-item]',
      availableWrapper: '[data-available-slide-wrapper]',
      togglePopup: '[data-toggle-popup]',
      popupSlideMain: '[data-popup-slide-main]',
      popupSlideSub: '[data-popup-slide-sub]',
    },
  }
})
export default class Popup {
  init() {
    this.initDOM();
    this.handlePopup();
  }

  initDOM() {
    const { availableSlideItem, togglePopup } = this.props.options;
    this.$availableSlideItem = this.$element.find(availableSlideItem);
    this.$togglePopup = this.$element.find(togglePopup);
  }

  handlePopup() {
    const {
      popup,
      popupSlideMain,
      popupSlideSub,
      popupOverlay
    } = this.props.options;

    this.$togglePopup.on('click', () => {
      this.$element.append(templatePopup);
      this.$element.append(templateOverlay);

      this.$popupSlideMain = this.$element.find(popupSlideMain);
      this.$popupSlideSub = this.$element.find(popupSlideSub);

      this.$availableSlideItem.each((index, item) => {
        const slideImg = $(item).children();
        const srcItem = slideImg.attr('src');
        const altItem = slideImg.attr('alt');

        this.$popupSlideMain.append(this.createSlideItem(srcItem, altItem));
        this.$popupSlideSub.append(this.createSlideItem(srcItem, altItem));
      });

      $('[data-slider-slick]')['slider-slick']('init');

      this.$popupOverlay = this.$element.find(popupOverlay);
      this.$popup = this.$element.find(popup);

      this.$popupOverlay.on('click', () => {
        this.$popupOverlay.remove();
        this.$popup.remove();
        $('[data-slider-slick]')['slider-slick']('init');
      });
    });
  }

  /* eslint-disable */ 
  createSlideItem(src, alt) {
    return `<div><img src='${src}' alt='${alt}'/></div>`;
  }
}
