TaskBin.Models.Card = Backbone.Model.extend({
  urlRoot: '/cards/',

  todoItems: function() {
    this._todoItems || (this._todoItems = new TaskBin.Collections.TodoItems({ card: this }));
    this._todoItems.fetch();
    return this._todoItems;
  }
});