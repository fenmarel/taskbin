Tasko::Application.routes.draw do
  root to: 'boards#index'
  resources :boards, :except => [:new, :edit] do
    resources :lists, :shallow => true, :except => [:new, :edit]
  end

  resources :cards, only: [:create, :update, :destroy] do
    resources :todo_items, :shallow => true, :except => [:new, :edit]
  end

  resources :card_assignments, only: :destroy
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy]
end
