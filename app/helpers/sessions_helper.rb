module SessionsHelper
  def require_login!
    redirect_to new_session_url unless logged_in?
  end

  def current_user
    session_token = session[:session_token]
    return nil if session_token.nil?

    @current_user ||= User.find_by_session_token(session_token)
  end

  def logged_in?
    !!current_user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
  end
end
