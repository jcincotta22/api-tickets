class SavedEvent < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :user_id, message: 'must be signed in'
  validates :user_id, numericality: { only_integer: true }
  validates :site, presence: true
  validates :url, presence: true

end
