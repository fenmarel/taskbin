class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_credentials(user_params)

    if user
      login!(user)
      # flash[:success] = ["Welcome back, #{user.username}!"]
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid Username/Password"]
      render :new
    end
  end

  def destroy
    logged_in? && logout!
    redirect_to new_session_url
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
