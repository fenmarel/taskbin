Tasko.Routers.TaskoRouter = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "boards/:id": "boardShow",
    "cards/:id": "cardShow"
  },

  boardIndex: function() {
    this._swapView(new Tasko.Views.BoardsIndex({
      collection: Tasko.boards
    }));
  },

  boardShow: function(id) {
    var vent = _.extend({}, Backbone.Events);

    this._swapView(new Tasko.Views.BoardsShow({
      model: Tasko.boards.get(id),
      vent: vent
    }))
  },

  cardShow: function(id) {
    var showView = new Tasko.Views.CardsShow();
    $('#content').html(showView.render().$el);
  },

  _swapView: function(newView) {
    this.currentView && this.currentView.remove();
    this.currentView = newView;
    $('#content').html(this.currentView.render().$el);
  }
});