TaskBin.Models.List = Backbone.Model.extend({
  urlRoot: '/lists/',

  cards: function() {
    this._cards || (this._cards = new TaskBin.Collections.Cards({ list: this }));
    this._cards.fetch();
    return this._cards;
  }
});