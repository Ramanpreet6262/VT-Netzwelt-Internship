new Vue({
  el: '#app',
  data: {
    attachRed: false,
    color: 'green',
    colorr: 'gray',
    width: 100
  },
  computed: {
    divClasses: function() {
      return {
        red: this.attachRed,
        blue: !this.attachRed
      };
    },
    myStyle: function() {
      return {
        backgroundColor: this.colorr,
        width: this.width + 'px'
      };
    }
  }
});
