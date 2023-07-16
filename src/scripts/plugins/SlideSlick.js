const dataAttr = {
  defaultSliderAttr: 'defaultOptionsSlider',
};

const { defaultSliderAttr } = dataAttr;
@Plugin({
  props: {
    options: {
      sliderWrapper: '[data-slider-wrapper]',
      sliderWrapperPopup: '[data-slider-wrapper-popup]',
      dotsWrapper: '[data-dots-wrapper]',
      sliderWrapperSmall: '[data-slider-wrapper-small]',
      sliderWrapperSmallPopup: '[data-slider-wrapper-small-popup]',
      defaultOptionSlider: '[data-default-options-slider]'
    },
  }
})
export default class SliderSlick {
  init() {
    this.initDOM();
    this.handleSlick();
    this.handleSlickPopup();
    this.handleSlickSmallImg();
    this.handleSlickSmallImgPopup();
  }

  initDOM() {
    const {
      sliderWrapper,
      sliderWrapperSmall,
      defaultOptionSlider,
      sliderWrapperSmallPopup,
      sliderWrapperPopup
    } = this.props.options;

    this.$slideImgContainer = this.$element.find(sliderWrapper);
    this.$slideImgContainerPopup = this.$element.find(sliderWrapperPopup);
    this.$slideImgContainerSmall = this.$element.find(sliderWrapperSmall);
    this.$sliderWrapperSmallPopup = this.$element.find(sliderWrapperSmallPopup);
    this.$defaultSlider = this.$element.find(defaultOptionSlider).data(defaultSliderAttr);
  }

  handleSlick() {
    this.$slideImgContainer.slick({
      ...this.$defaultSlider,
      asNavFor: '.ProductDetail-item-listImg, .PopupImgProduct-Main, .PopupImgProduct-Sub-Slider',
    });
  }

  handleSlickPopup() {
    this.$slideImgContainerPopup.slick({
      ...this.$defaultSlider,
      variableWidth: true,
      asNavFor: '.ProductDetail-item-imgMain, .ProductDetail-item-listImg, .PopupImgProduct-Sub-Slider',
      // asNavFor: this.$sliderWrapperSmallPopup,
    });
  }

  handleSlickSmallImg() {
    this.$slideImgContainerSmall.slick({
      ...this.$defaultSlider,
      vertical: true,
      verticalSwiping: true,
      focusOnSelect: true,
      asNavFor: '.ProductDetail-item-imgMain, .PopupImgProduct-Main, .PopupImgProduct-Sub-Slider',
      // asNavFor: this.$slideImgContainer
    });
  }

  handleSlickSmallImgPopup() {
    this.$sliderWrapperSmallPopup.slick({
      ...this.$defaultSlider,
      focusOnSelect: true,
      asNavFor: '.ProductDetail-item-listImg, .ProductDetail-item-imgMain, .PopupImgProduct-Main',
      // asNavFor: this.$slideImgContainerPopup,
    });
  }
}
