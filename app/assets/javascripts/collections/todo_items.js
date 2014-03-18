Tasko.Collections.TodoItems = Backbone.Collection.extend({
  initialize: function(options) {
    this.card = options.card;
  },

  url: function() {
    return this.card.url() + '/todo_items'
  },

  model: Tasko.Models.TodoItem,

  comparator: "created_at"
});