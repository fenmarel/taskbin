Tasko.Views.BoardsShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.lists = this.model.lists();
    _.bindAll(this, "addList");
    options.vent.bind("addList", this.addList);

    this.listenTo(this.lists, "add", this.render);

    var that = this;
    this.lists.fetch({
      success: function(data) {
        data.each(that.addList.bind(that));
        that.addListForm(options.vent);
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
  },

  addListForm: function(vent) {
    var listNew = new Tasko.Views.ListsNew({
      collection: this.lists,
      board: this.model,
      vent: vent
    });
    this.addSubview("#list-form", listNew);
    listNew.render();
  }
});