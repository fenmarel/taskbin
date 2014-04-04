require 'bcrypt'

class User < ActiveRecord::Base

  validates :email, :password_digest, presence: true
  validates :email, uniqueness: true

  has_many :board_assignments, inverse_of: :user
  has_many :boards, through: :board_assignments, source: :board, inverse_of: :members

  has_many :card_assignments, inverse_of: :user
  has_many :cards, through: :card_assignments, source: :card, inverse_of: :users


  def self.find_by_credentials(user_params)
    user = User.find_by_username(user_params[:username])

    user && user.verify_password(user_params[:password]) ? user : nil
  end

  def password=(input)
    self.password_digest = BCrypt::Password.create(input)
  end

  def verify_password(input)
    BCrypt::Password.new(self.password_digest).is_password?(input)
  end

  def reset_session_token!
    self.session_token = SecureRandom::base64(32)
    self.save!

    self.session_token
  end

  def as_json(options = {})
    super(options.merge({ except: [:password_digest, :session_token], include: :cards }))
  end

  def populate_guest
    demo = self.boards.create(title: 'Demo Board')

    todo = demo.lists.create(title: 'To Do', rank: 1)
    doing = demo.lists.create(title: 'Doing', rank: 2)
    done = demo.lists.create(title: 'Done', rank: 3)

    todo.cards.create([
      {title: "Hire Jon", description: "he's pretty cool, you should give him a call", rank: 1},
      {title: "Click me for details", description: "task descriptions go here", rank: 2},
      {title: "Drag me somewhere else", description: "you can also rearrange lists", rank: 3}
    ])

    doing.cards.create([
      {title: "Check out my work", description: "see my other work at www.github.com/fenmarel", rank: 1}
    ])

    done.cards.create(title: "Gain a Sense of Satisfaction", description: "ahhhh... sweet satisfaction", rank: 1)

  end

end
