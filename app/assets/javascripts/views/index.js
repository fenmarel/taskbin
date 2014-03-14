Tasko.Views.BoardIndex = Backbone.View.extend({
  initialize: function() {

  },

  template: JST['boards/index'],

  render: function() {
    this.$el.html(this.template({ boards: this.collection }));
    return this;
  }
});