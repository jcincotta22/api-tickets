class User < ApplicationRecord
  has_many :search_histories
  has_many :saved_events
  has_many :recommended_searches
  
  validates_presence_of :first_name
  validates_presence_of :last_name
  validates :email, presence: true, format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i, message: "Must be a valid email address"}
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
