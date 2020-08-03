new Vue({
  el: '#app',
  data: {
    title: 'Hello World!',
    link: 'http://google.com',
    finishedLink: '<a href="http://google.com">Google</a>',
    counter: 0,
    x: 0,
		y: 0,
		showPara: true,
		name: "John"
  },
  methods: {
    sayHello() {
      this.title = 'Hello!';
      return this.title;
    },
    incrementCount(step) {
      this.counter += step;
    },
    updateCoords(event) {
      this.x = event.clientX;
      this.y = event.clientY;
    },
    dummy(event) {
      event.stopPropagation();
      // only handling it here in this handler
      // and don't letting it propagate upto any elements which might hold this element

      // whereas event.preventDefault() stops its default work
    },
    alertMe() {
      alert('Hi');
    }
  }
});
