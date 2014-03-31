TaskBin.Models.Board = Backbone.Model.extend({
  urlRoot: '/boards/',

  lists: function() {
    this._lists || (this._lists = new TaskBin.Collections.Lists({ board: this }));
    this._lists.fetch();
    return this._lists;
  }
});