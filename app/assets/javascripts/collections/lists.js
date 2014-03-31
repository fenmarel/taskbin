TaskBin.Collections.Lists = Backbone.Collection.extend({
  initialize: function(options) {
    this.board = options.board;
  },

  url: function() {
    return this.board.url() + '/lists'
  },

  model: TaskBin.Models.List,

  comparator: "rank"
});