TaskBin.Collections.TodoItems = Backbone.Collection.extend({
  initialize: function(options) {
    this.card = options.card;
  },

  url: function() {
    return this.card.url() + '/todo_items'
  },

  model: TaskBin.Models.TodoItem,

  comparator: "created_at"
});