TaskBin.Routers.TaskBinRouter = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "boards/:id": "boardShow",
    "cards/:id": "cardShow"
  },

  boardIndex: function() {
    this._swapView(new TaskBin.Views.BoardsIndex({
      collection: TaskBin.boards
    }));
  },

  boardShow: function(id) {
    var vent = _.extend({}, Backbone.Events);

    this._swapView(new TaskBin.Views.BoardsShow({
      model: TaskBin.boards.get(id),
      vent: vent
    }))
  },

  cardShow: function(id) {
    var showView = new TaskBin.Views.CardsShow();
    $('#content').html(showView.render().$el);
  },

  _swapView: function(newView) {
    this.currentView && this.currentView.remove();
    this.currentView = newView;
    $('#content').html(this.currentView.render().$el);
  }
});