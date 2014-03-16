Tasko.Views.ListsShow = Backbone.View.extend({
  initialize: function(options) {
    this.cards = this.model.cards();

    this.listenTo(this.cards, "add", this.render);

    var that = this;
    this.cards.fetch({
      success: function(data) {
        data.each(that.addCard.bind(that));
      }
    });
  },

  template: JST['lists/show'],

  events: {
    "click .add-card-toggle": "toggleCardForm",
    "click .new-card-untoggle": "untoggleCardForm",
    "submit .new-card-form": "createCard",
    "click .card-show-modal": "showModal"
  },

  render: function() {
    var content = this.template({
      list: this.model,
      cards: this.cards.where({ list_id: this.model.id })
    });

    this.$el.html(content);
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
    var card = this.cards.get($(event.currentTarget).data().id);

    var form = JST['cards/show']({ card: card });
    $('#modal').html(form);
  }
});






