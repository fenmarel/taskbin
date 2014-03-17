class CardsController < ApplicationController

  def create
    @card = Card.new(new_card_params)

    if @card.save
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end

  def index
    @cards = Card.all

    render :json => @cards
  end

  def update
    @card = Card.find(params[:id])
    @card.update_attributes(update_card_params)

    if params[:newUserEmail]
      email = params[:newUserEmail]
      new_user = User.find_by_email(email)
      new_user && !@card.users.include?(new_user) && @card.users << new_user
    end

    if @card.save
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    render json: nil
  end


  private
  def new_card_params
    current_rank = Card.all.where(list_id: params[:card][:list_id]).pluck(:rank).max
    base = params.require(:card).permit(:title, :list_id)
    base[:rank] = current_rank ? current_rank + 1 : 1
    base
  end

  def update_card_params
    params.require(:card).permit(:title, :description, :rank, :list_id)
  end
end
