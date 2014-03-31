window.TaskBin = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    TaskBin.boards = new TaskBin.Collections.Boards();
    TaskBin.boards.fetch({
      success: function() {
        new TaskBin.Routers.TaskBinRouter();
        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  TaskBin.initialize();
});


Backbone.CompositeView = Backbone.View.extend({
  addSubview: function(viewType, view) {
    var currentSubviews =
      this.subviews()[viewType] || (this.subviews()[viewType] = []);

    currentSubviews.push(view);

    var $currentEl = this.$(viewType);
    $currentEl.append(view.$el);
  },

  remove: function() {
    Backbone.View.prototype.remove.call(this);

    _(this.subviews()).each(function(subviews, viewType) {
      _(subviews).each(function(view) {
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

      _(subviews).each(function(view) {
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













