const attributeName = {
  sliderSlick: 'data-slider-slick',
  sliderWrapperSmall: 'data-slider-wrapper-small',
  sliderWrapper: 'data-slider-wrapper',
  attrTogglePopup: 'data-toggle-popup',
};

const classes = {
  productDetailItemImgMain: 'ProductDetail-item-imgMain',
};

const {
  sliderWrapper,
  attrTogglePopup,
} = attributeName;

const {
  productDetailItemImgMain,
} = classes;

const templateGeneratedSlideWrapper = `<div class=${productDetailItemImgMain} ${sliderWrapper} ${attrTogglePopup}></div>`;

@Plugin({
  props: {
    options: {
      slideContainer: '[data-slide-container]',
      availableSlideWrapper: '[data-available-slide-wrapper]',
      availableSlideItem: '[data-available-slide-item]',
      generatedSlideWrapper: '[data-slider-wrapper]',
      generatedSlideItem: '[data-generated-slide-item]',
      togglePopup: '[data-toggle-popup]',
    },
  }
})
export default class Slide {
  init() {
    this.initDOM();
    this.handleGenerateSlide();
  }

  initDOM() {
    const { slideContainer, availableSlideWrapper, availableSlideItem } = this.props.options;

    this.$slideContainer = this.$element.find(slideContainer);
    this.$availableSlideWrapper = this.$element.find(availableSlideWrapper);
    this.$availableSlideItem = this.$element.find(availableSlideItem);
  }

  handleGenerateSlide() {
    const { generatedSlideWrapper } = this.props.options;

    this.$slideContainer.append(templateGeneratedSlideWrapper);
    this.$generatedSlideWrapper = this.$element.find(generatedSlideWrapper);

    this.$availableSlideItem.each((index, item) => {
      const slideImg = $(item).children();
      const itemSrc = slideImg.attr('src');
      const itemAlt = slideImg.attr('alt');

      this.$generatedSlideWrapper.append(this.createSlideItem(itemSrc, itemAlt));
    });
  }

  /* eslint-disable */ 
  createSlideItem(src, alt) {
    return `<div><img src='${src}' alt='${alt}'/></div>`;
  }
}
