TaskBin.Views.ListsNew = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.board = options.board;
    this.vent = options.vent;
  },

  el: '<div class="list-object">',

  template: JST['lists/new'],

  events: {
    "submit #new-list-form": "createList"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  createList: function(event) {
    event.preventDefault();
    var that = this;
    var data = $(event.target).serializeJSON();

    $.ajax({
      url: this.board.url() + '/lists',
      type: 'POST',
      data: data,
      success: function(list) {
        var listModel = that.collection.add(list);
        that.vent.trigger("addList", listModel);
      }
    });
  }
});