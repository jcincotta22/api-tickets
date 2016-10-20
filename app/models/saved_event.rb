class SavedEvent < ActiveRecord::Base
  belongs_to :user
  belongs_to :search_history

  validates_presence_of :user_id, message: 'must be signed in'
  validates :user_id, numericality: { only_integer: true }
  validates :search_history_id, presence: true, numericality: { only_integer: true }
  validates :site, presence: true
end
