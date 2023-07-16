const classes = {
  preventEvent: 'preventEvent',
  cursorActive: 'cursorActive'
};

const { preventEvent, cursorActive } = classes;

@Plugin({
  props: {
    options: {
      starMap: {
        0.5: '0.5',
        1: '1',
        1.5: '1.5',
        2: '2',
        2.5: '2.5',
        3: '3',
        3.5: '3.5',
        4: '4',
        4.5: '4.5',
        5: '5'
      },
      ratingValue: 0,
    },
  }
})
export default class RatingStar {
  init() {
    this.initDOM();
    this.setResponseRating();
    this.handleRating();
  }

  initDOM() {
    this.$input = this.$element.find('input');
    this.$label = this.$element.find('label');
  }

  setResponseRating() {
    if (this.props.productRating) {
      this.setStarRating(this.props.productRating.toString());
    } else {
      this.setStarRating('0');
    }
  }

  handleRating() {
    if (!this.props.productRating) {
      this.$label.addClass(cursorActive);
      this.$label.on('click', (e) => {
        const target = $(e.currentTarget);
        this.setStarRating(target.attr('title'));
      });
    } else {
      this.$label.addClass(preventEvent);
    }
  }

  setStarRating(value) {
    this.$input.prop('checked', '');
    const fieldValue = this.props.options.starMap[value];
    const inputChecked = this.$input.filter((i) => this.$input.eq(i).val() === fieldValue);
    inputChecked.prop('checked', true);
  }
}
