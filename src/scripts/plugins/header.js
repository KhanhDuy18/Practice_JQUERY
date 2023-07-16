const classes = {
  headerForMobile: 'headeForMobile',
  toggleBtt: '.header-right-iconToggle',
  active: 'active',
  linkItem: '.header-right-link .linkItem'
};
const {
  headerForMobile,
  toggleBtt,
  linkItem,
  active
} = classes;

@Plugin()
export default class HeaderMobile {
  init() {
    this.initState();
    this.initDOM();
    this.handleShowMenuMobile();
    this.handleLinkItem();
  }

  initDOM() {
    this.$menu = this.$element;
    this.$toggleBtt = this.$element.find(toggleBtt);
    this.$linkItem = this.$element.find(linkItem);
  }

  initState() {
    this.addState('isMenuMobile', false);
  }

  handleShowMenuMobile() {
    this.$toggleBtt.on('click', () => {
      if (this.state.isMenuMobile === false) {
        this.$menu.addClass(headerForMobile);
        this.state.isMenuMobile = true;
      } else {
        this.$menu.removeClass(headerForMobile);
        this.state.isMenuMobile = false;
      }
    });
  }

  handleLinkItem() {
    this.$linkItem.on('click', (e) => {
      const target = $(e.currentTarget);
      this.$linkItem.removeClass(active);
      target.addClass(active);
    });
  }
}
