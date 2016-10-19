class SavedEvent < ActiveRecord::Base
  belongs_to :user
  belongs_to :search_history

  validates :user_id, presence: true, numericality: { only_integer: true }
  validates :search_history_id, presence: true, numericality: { only_integer: true }
  validates :date, presence: true
  validates :end_date, presence: true
  validates :keyword, presence: true
  validates :event_id, presence: true
  validates :site, presence: true
  validates :keyword, presence: true
end
