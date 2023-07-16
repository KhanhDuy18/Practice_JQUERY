import Swiper from 'swiper';

const classes = {
  swiper: 'swiper',
  swiperWrapper: 'swiper-wrapper',
  swiperSlide: 'swiper-slide',
  swiperPagination: 'swiper-pagination',
};
const {
  swiper,
  swiperWrapper,
  swiperSlide,
  swiperPagination
} = classes;

@Plugin({
  props: {
    options: {
      sliderWrapper: '[data-slider-wrapper]',
      dotsWrapper: '[data-dots-wrapper]',
    },
  }
})
export default class SliderSwiper {
  init() {
    this.initDOM();
    this.handleSlide();
  }

  initDOM() {
    const { sliderWrapper, dotsWrapper } = this.props.options;
    this.$slideContainer = this.$element;
    this.$slideImgContainer = this.$slideContainer.find(sliderWrapper);
    this.$slideImg = this.$slideImgContainer.children();
    this.$slideButtons = this.$element.find(dotsWrapper);
  }

  handleSlide() {
    this.$slideContainer.addClass(swiper);
    this.$slideImgContainer.addClass(swiperWrapper);
    this.$slideImg.addClass(swiperSlide);
    this.$slideButtons.addClass(swiperPagination);
    const swiperFeature = new Swiper(this.$slideContainer, {
      direction: 'horizontal',
      pagination: {
        el: `.${swiperPagination}`,
        clickable: true,
      },
    });
  }
}
