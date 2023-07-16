@Plugin
export default class TemplatePlugin {
  init() {
    this.initState();
    this.initEvents();
    this.$element.text('template initialized');
  }

  initState() {
    this.addState('reactableVariable', 0);
  }

  initEvents() {
    this.addEvent(this.$element, 'click', this.onClick);
  }

  onClick() {
    this.state.reactableVariable += 1;
  }

  watch = {
    reactableVariable(value) {
      console.info('value changed', value);
    },
  }
}
