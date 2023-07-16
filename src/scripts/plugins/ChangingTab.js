const classes = {
  active: 'active',
};

const cssAttribute = {
  timeSlide: 300,
};

const {
  active
} = classes;

const {
  timeSlide
} = cssAttribute;

@Plugin({
  props: {
    options: {
      mobile: {
        mobileTabWrapper: '[data-mobile-tab-wrapper]',
        mobileTabTitle: '[data-mobile-tab-title]',
        mobileTabContent: '[data-mobile-tab-content]'
      },
      desktop: {
        desktopTabWrapper: '[data-desktop-tab-wrapper]',
        desktopTabTitle: '[data-desktop-tab-title]',
        desktopTabContent: '[data-desktop-tab-content]'
      }
    }
  }
})
export default class ChangingTab {
  init() {
    this.initDOM();
    this.handleChangeMobileTab();
    this.handleChangeDesktopTab();
  }

  initDOM() {
    const { desktopTabWrapper, desktopTabTitle, desktopTabContent } = this.props.options.desktop;
    const { mobileTabWrapper, mobileTabTitle, mobileTabContent } = this.props.options.mobile;
    this.$mobileTabWrapper = this.$element.find(mobileTabWrapper);
    this.$mobileTabTitle = this.$mobileTabWrapper.find(mobileTabTitle);
    this.$mobileTabContent = this.$mobileTabWrapper.find(mobileTabContent);
    this.$desktopTabWrapper = this.$element.find(desktopTabWrapper);
    this.$desktopTabTitle = this.$desktopTabWrapper.find(desktopTabTitle);
    this.$desktopTabContent = this.$desktopTabWrapper.find(desktopTabContent);
  }

  handleChangeMobileTab() {
    const { mobileTabContent } = this.props.options.mobile;
    this.$mobileTabTitle.on('click', (e) => {
      const titleTarget = $(e.currentTarget);
      const contentTarget = titleTarget.parent().find(mobileTabContent);
      const titleDataValueTarget = titleTarget.data('mobileTabTitle');
      const desktopTitleDataValueTarget = `[data-desktop-tab-title="${titleDataValueTarget}"]`;
      const desktopContentDataValueTarget = `[data-desktop-tab-content="${titleDataValueTarget}"]`;
      if (titleTarget.hasClass(active)) {
        titleTarget.removeClass(active);
        contentTarget.slideUp(timeSlide);
      } else {
        this.removeActiveCLassAllItem();
        titleTarget.addClass(active);
        contentTarget.slideDown(timeSlide);
        this.removeActiveCLassAllItem('desktop');
        this.$desktopTabWrapper.find(desktopTitleDataValueTarget).addClass(active);
        this.$desktopTabWrapper.find(desktopContentDataValueTarget).addClass(active);
      }
    });
  }

  handleChangeDesktopTab() {
    this.$desktopTabTitle.on('click', (e) => {
      const titleTarget = $(e.currentTarget);
      const titleDataValueTarget = titleTarget.data('desktopTabTitle');
      const contentDataValueTarget = `[data-desktop-tab-content="${titleDataValueTarget}"]`;
      const mobileTitleDataValueTarget = `[data-mobile-tab-title="${titleDataValueTarget}"]`;
      const mobileContentDataValueTarget = `[data-mobile-tab-content="${titleDataValueTarget}"]`;

      this.removeActiveCLassAllItem('desktop');
      titleTarget.addClass(active);
      this.$desktopTabWrapper.find(contentDataValueTarget).addClass(active);
      this.removeActiveCLassAllItem();
      this.$mobileTabWrapper.find(mobileTitleDataValueTarget).addClass(active);
      this.$mobileTabWrapper.find(mobileContentDataValueTarget).slideDown(timeSlide);
    });
  }

  removeActiveCLassAllItem(device = 'mobile') {
    if (device === 'mobile') {
      this.$mobileTabTitle.removeClass(active);
      this.$mobileTabContent.slideUp(timeSlide);
    } else if (device === 'desktop') {
      this.$desktopTabTitle.removeClass(active);
      this.$desktopTabContent.removeClass(active);
    }
  }
}
