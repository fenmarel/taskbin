Tasko.Collections.Cards = Backbone.Collection.extend({
  initialize: function(options) {
    this.list = options.list;
  },

  url: '/cards',

  model: Tasko.Models.Card,

  comparator: "rank"

});