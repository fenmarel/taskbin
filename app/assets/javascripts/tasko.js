window.Tasko = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Tasko.boards = new Tasko.Collections.Boards();
    Tasko.boards.fetch({
      success: function() {
        new Tasko.Routers.TaskoRouter();
        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  Tasko.initialize();
});


Backbone.CompositeView = Backbone.View.extend({
  addSubview: function(viewType, view) {
    var currentSubviews = this.subviews()[viewType] || (this.subviews() = []);
    currentSubviews.push(view);

    var $currentEl = this.$(viewType);
    $currentEl.append(view.$el);
  },

  remove: function() {
    Backbone.View.prototype.remove.call(this);

    _(this.subviews()).each(function(subviews, viewType) {
      subviews.each(function(view) {
        view.remove();
      });
    });
  },

  removeSubview: function(viewType, view) {
    var currentSubviews = this.subviews()[viewType] || (this.subviews() = []);
    var viewIndex = currentSubviews.indexOf(view);

    viewIndex !== -1 && currentSubviews.splice(viewIndex, 1);
    view.remove();
  },

  renderSubviews: function() {
    var that = this;

    _(this.subviews()).each(function(subviews, viewType) {
      var $currentEl = that.$(viewType);
      $currentEl.empty();

      subviews.each(function(view) {
        $currentEl.append(view.render().$el);
        view.delegateEvents();
      });
    });
  },

  subviews: function() {
    this._subviews || (this._subviews = {});
    return this._subviews;
  }
});













