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
