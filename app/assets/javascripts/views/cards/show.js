Tasko.Views.CardsShow = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, "change", this.updateModal)
  },

  template: JST['cards/show'],

  events: {
    "click .edit-description-toggle": "toggleDescriptionForm",
    "click .card-description": "toggleDescriptionForm",
    "click .description-untoggle": "untoggleDescriptionForm",
    "submit #card-description-form": "updateDescription"
  },

  render: function() {
    var content = this.template({ card: this.model });
    this.$el.html(content);

    return this;
  },

  toggleDescriptionForm: function(event) {
    event.preventDefault();
    var $target = $(event.target);
    $target.hide();
    $('.card-description').hide();

    var form = JST['cards/_description_edit']({ card: this.model });
    $target.parent().append(form);
  },

  untoggleDescriptionForm: function() {
    $('#card-description-form').remove();
    $('.edit-description-toggle').show();
    $('.card-description').show();
  },

  updateDescription: function() {
    event.preventDefault();
    var data = $(event.target).serializeJSON();

    this.model.save(data, { patch: true });
    this.untoggleDescriptionForm();
  },

  updateModal: function() {
    //TODO: add other change functionality

    $(this.$el).find('.card-description').html(this.model.escape('description'));
  }
});