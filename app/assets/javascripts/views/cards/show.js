TaskBin.Views.CardsShow = Backbone.View.extend({
  initialize: function() {
    this.todoItems = this.model.todoItems();

    this.listenTo(this.model, "change", this.updateModal)
    this.listenTo(this.todoItems, "add sync", this.updateModal)
  },

  template: JST['cards/show'],

  events: {
    "click .edit-description-toggle": "toggleDescriptionForm",
    "click .card-description": "toggleDescriptionForm",
    "click .description-untoggle": "untoggleDescriptionForm",
    "submit #card-description-form": "updateDescription",
    "click .todo": "taskCompletion",
    "click #add-item-toggle": "toggleItemForm",
    "click .new-item-untoggle": "untoggleItemForm",
    "submit .new-item-form": "createItem"
  },

  render: function() {
    var content = this.template({ card: this.model, todoItems: this.todoItems });
    this.$el.html(content);

    return this;
  },

  toggleDescriptionForm: function(event) {
    event.preventDefault();
    var $target = $(event.target);
    $target.hide();
    $('.card-description').hide();

    var form = JST['cards/_description_edit']({ card: this.model });
    $target.parent().prepend(form);
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
    var todoTemplate = JST['todo_items/index'];
    var todoContent = todoTemplate({ todoItems: this.todoItems });

    $(this.$el).find('.card-description').html(this.model.escape('description'));
    $(this.$el).find('.todo-items').html(todoContent);
  },

  taskCompletion: function(event) {
    var id = $(event.target).data('id');
    var todoItem = this.todoItems.get(id);

    if (event.target.checked) {
      todoItem.save({ done: true }, { patch: true });
    } else {
      todoItem.save({ done: false }, { patch: true });
    }
  },

  toggleItemForm: function(event) {
    event.preventDefault();

    var itemForm = JST['todo_items/new'];

    $(event.target).hide();
    $('#item-form-container').append(itemForm({ card: this.model }));
  },

  untoggleItemForm: function(event) {
    event.preventDefault();
    $('#item-form-container').empty();
    $('#add-item-toggle').show();
  },

  createItem: function(event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    var that = this;

    $.ajax({
      url: this.model.url() + '/todo_items',
      type: 'POST',
      data: data,
      success: function(item) {
        that.untoggleItemForm(event);
        that.todoItems.add(item);
        that.updateModal();
      }
    });
  }
});