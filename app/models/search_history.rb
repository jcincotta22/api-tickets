class SearchHistory < ActiveRecord::Base
  belongs_to :user
  belongs_to :ticket
  has_many :recommended_searches

  validates :user_id, presence: true, numericality: { only_integer: true }
  validates :ticket_id, presence: true, numericality: { only_integer: true }
end
