import { $win, $doc, $body } from '@/utils/doms';

const attributeValue = {
  timeScroll: 500,
};
const classes = {
  bttShow: 'BttShow'
};

const { bttShow } = classes;
const { timeScroll } = attributeValue;

@Plugin()
export default class BttButton {
  init() {
    this.initDOM();
    this.handleShowScrollToTop();
    this.handleScrollToTop();
  }

  initDOM() {
    this.$btt = $(this.$element);
  }

  handleShowScrollToTop() {
    const heightOfHeader = $('header').height();
    const paddingTopOfHeader = parseInt($('header').css('paddingTop').replace('px', ''), 10);
    const marginTopOfMain = parseInt($('main').css('marginTop').replace('px', ''), 10);
    const position = marginTopOfMain - paddingTopOfHeader - heightOfHeader;
    $win.on('scroll', () => {
      if ($doc.scrollTop() > position) {
        this.$btt.addClass(bttShow);
      } else {
        this.$btt.removeClass(bttShow);
      }
    });
  }

  handleScrollToTop() {
    this.$btt.on('click', () => {
      $body.animate({ scrollTop: 0 }, timeScroll);
    });
  }
}
