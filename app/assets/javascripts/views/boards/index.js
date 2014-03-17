Tasko.Views.BoardsIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "add", this.render);
    $(window).on('resize', this.resizeWindow);
  },

  template: JST['boards/index'],

  events: {
    "submit #new-board": "createBoard"
  },

  render: function() {
    $('body').css("background-color", "#FFFFFF");
    $("#content").width($(window).width() - 70);
    this.$el.html(this.template({ boards: this.collection }));
    return this;
  },

  remove: function() {
    $(window).off("resize", this.resizeWindow);
    Backbone.View.prototype.remove.apply(this, arguments);
  },

  createBoard: function(event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    var that = this;

    $.ajax({
      url: '/boards',
      type: 'POST',
      data: data,
      success: function(board) {
        that.collection.add(board);
        $('#new-board-divider').before(
          '<li><a href="#/boards/' + board.id + '">' + _.escape(board.title) + '</a></li>'
        );

      }
    });
  },

  resizeWindow: function(event) {
    $("#content").width($(window).width() - 70);
  }
});