class ListsController < ApplicationController

  def index
    @lists = List.where("board_id = ?", params[:board_id])
    render json: @lists
  end

  def show
    @list = List.find(params[:list_id])
    render json: @list
  end

  def create
    @list = List.new(new_list_params)

    if @list.save
      render json: @list
    else
      render json: { errors: @list.errors.full_messages }, status: 422
    end
  end

  def update
    @list = List.find(params[:id])
    @list.update_attributes(update_list_params)

    if @list.save
      render json: @list
    else
      render json: { errors: @list.errors.full_messages }, status: 422
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render json: nil
  end

  private
  def new_list_params
    board = Board.find(params[:board_id])
    current_rank = board.lists.pluck(:rank).max
    base = params.require(:list).permit(:title)

    base[:rank] = current_rank ? current_rank + 1 : 1
    base[:board_id] = board.id
    base
  end

  def update_list_params
    params.require(:list).permit(:title, :rank)
  end
end
