const classes = {
  defaultIcon: 'fa-heart-o',
  reactedIcon: 'fa-heart'
};
const { defaultIcon, reactedIcon } = classes;

@Plugin({
})
export default class ReactIcon {
  init() {
    this.handleReact();
  }

  handleReact() {
    this.$element.on('click', () => {
      this.$element.toggleClass(defaultIcon);
      this.$element.toggleClass(reactedIcon);
    });
  }
}
