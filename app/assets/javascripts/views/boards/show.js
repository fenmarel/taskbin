Tasko.Views.BoardsShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model.lists(), "all", this.render);
    var that = this;
    this.model.lists().fetch({
      success: function(data) {
        data.each(that.addList.bind(that));
      }
    });

  },

  template: JST['boards/show'],

  render: function() {
    $('body').css("background-color", "#23719F");
    this.$el.html(this.template({ board: this.model }));

    this.renderSubviews();
    return this;
  },

  addList: function(list) {
    var listShow = new Tasko.Views.ListsShow({ model: list });
    this.addSubview("#lists", listShow);
    listShow.render();
  }
});