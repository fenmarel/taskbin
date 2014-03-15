Tasko.Routers.TaskoRouter = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "boards/:id": "boardShow"
  },

  boardIndex: function() {
    this._swapView(new Tasko.Views.BoardsIndex({
      collection: Tasko.boards
    }));
  },

  boardShow: function(id) {
    this._swapView(new Tasko.Views.BoardsShow({
      model: Tasko.boards.get(id)
    }))
  },

  _swapView: function(newView) {
    this.currentView && this.currentView.remove();
    this.currentView = newView;
    $('#content').html(this.currentView.render().$el);
  }
});