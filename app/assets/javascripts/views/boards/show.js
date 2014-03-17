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
    var $cnt = $('#content');
    $('body').css("background-color", "#23719F");
    this.$el.html(this.template({ board: this.model }));
    this.renderSubviews();

    $('#lists').sortable({
      tolerance: 'pointer',
      stop: this.reorderLists.bind(this)
    })

    return this;
  },

  addList: function(list) {
    var listShow = new Tasko.Views.ListsShow({ model: list });
    this.addSubview("#lists", listShow);
    var $cnt = $('#content');
    $cnt.width(250 + this.lists.length * 21 * (parseInt($cnt.css('font-size')) + 1));
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
  },

  reorderLists: function(event, ui) {
    var $uiItem = $(ui.item);
    var id = $uiItem.children('ol').data('list_id');
    var list = this.lists.get(id);

    var nextRank = $uiItem.next().children('ol').data('list_rank');
    var prevRank = $uiItem.prev().children('ol').data('list_rank');

    var newRank = list.get('rank');

    if (nextRank !== undefined && prevRank !== undefined) {
      newRank = (nextRank + prevRank) / 2.0;
    } else if (nextRank !== undefined) {
      newRank = nextRank - 10.0;
    } else if (prevRank !== undefined) {
      newRank = prevRank + 10.0;
    }

    list.save({ rank: newRank }, { patch: true});
  }
});