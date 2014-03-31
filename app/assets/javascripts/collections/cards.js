TaskBin.Collections.Cards = Backbone.Collection.extend({
  initialize: function(options) {
    this.list = options.list;
  },

  url: '/cards',

  model: TaskBin.Models.Card,

  comparator: "rank"

});