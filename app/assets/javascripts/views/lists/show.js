Tasko.Views.ListsShow = Backbone.View.extend({
  initialize: function(options) {
    this.cards = this.model.cards();

    this.listenTo(this.cards, "add", this.render);

    var that = this;
    this.cards.fetch({
      success: function(data) {
        data.each(that.addCard.bind(that));
      }
    });
  },

  template: JST['lists/show'],

  render: function() {
    var content = this.template({
      list: this.model,
      cards: this.cards.where({ list_id: this.model.id })
    });

    this.$el.html(content);
    return this;
  },

  addCard: function(card) {
    this.cards.add(card);
  }
});
