class SearchHistory < ActiveRecord::Base
  belongs_to :user
  belongs_to :ticket
  has_many :recommended_searches

end
