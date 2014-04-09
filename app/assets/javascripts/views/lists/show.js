TaskBin.Views.ListsShow = Backbone.View.extend({
  initialize: function(options) {
    this.cards = this.model.cards();

    this.listenTo(this.cards, "add remove", this.render);

    var that = this;
    this.cards.fetch({
      success: function(data) {
        data.each(that.addCard.bind(that));
      }
    });
  },

  el: '<div class="list-object">',

  template: JST['lists/show'],

  events: {
    "click .add-card-toggle": "toggleCardForm",
    "click .new-card-untoggle": "untoggleCardForm",
    "submit .new-card-form": "createCard",
    "click .card-show-modal": "showModal",
    "mouseenter .btn-taskbin-card": "showOptions",
    "mouseleave .btn-taskbin-card": "hideOptions",
    "click .delete-card": "deleteCard"
  },

  render: function() {
    var content = this.template({
      list: this.model,
      cards: this.cards.where({ list_id: this.model.id })
    });

    this.$el.html(content);

    $('.list-object .taskbin-card-list').sortable({
      handle: 'button',
      connectWith: ['.taskbin-card-list'],
      cancel: '',
      dropOnEmpty: true,
      stop: this.reorderCards.bind(this)
    }).disableSelection();

    return this;
  },

  addCard: function(card) {
    this.cards.add(card);
  },

  toggleCardForm: function(event) {
    event.preventDefault();
    $('.new-card-form').hide();
    $('.add-card-toggle').show();
    var $target = $(event.target);
    $target.hide();
    var $parent = $target.parent();
    var form = JST['cards/new']({ list: this.model });
    $parent.append(form);
  },

  untoggleCardForm: function(event) {
    event.preventDefault();

    $(event.target).parents('form').hide()
    $('.add-card-toggle').show();
  },

  createCard: function(event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    var that = this;

    $.ajax({
      url: '/cards',
      type: 'POST',
      data: data,
      success: function(card) {
        that.cards.add(card);
      }
    });
  },

  showModal: function(event) {
    event.preventDefault();
    if ($(event.target).hasClass('delete-card')) { return; }
    var card = this.cards.get($(event.currentTarget).data().id);
    var view = new TaskBin.Views.CardsShow({ model: card })

    this._currentModal && this._currentModal.remove();
    this._currentModal = view;

    $('#modal').html(view.render().$el);
  },

  reorderCards: function(event, ui) {
    var $uiItem = $(ui.item);

    var id = $uiItem.data('id');
    var card = this.cards.get(id);

    var nextRank = $uiItem.next() && $uiItem.next().data('rank');
    var prevRank = $uiItem.prev() && $uiItem.prev().data('rank');

    var newRank = card.get('rank');
    if (nextRank !== undefined && prevRank !== undefined) {
      newRank = (nextRank + prevRank) / 2.0;
    } else if (nextRank !== undefined) {
      newRank = nextRank - 10.0;
    } else if (prevRank !== undefined) {
      newRank = prevRank + 10.0;
    }

    var newListId = $(event.toElement).parents('ol').data('list_id');

    if (newListId !== card.get('list_id')) {
      card.save({ rank: newRank, list_id: newListId }, { patch: true });
    } else {
      card.save({ rank: newRank }, { patch: true });
    }
  },

  showOptions: function(event) {
    $(event.currentTarget).find('.delete-card').show();
  },

  hideOptions: function(event) {
    $(event.currentTarget).find('.delete-card').hide();
  },

  deleteCard: function(event) {
    event.preventDefault();
    var id = $(event.currentTarget).parent().data().id;
    var card = new TaskBin.Models.Card({ id: id });
    var that = this;

    card.destroy({
      success: function() {
        that.cards.remove(card);
      }
    });
  }
});






