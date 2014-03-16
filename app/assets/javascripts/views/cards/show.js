Tasko.Views.CardsShow = Backbone.View.extend({
  template: JST['cards/show'],

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});