class SavedEvent < ActiveRecord::Base
  belongs_to :user
  belongs_to :search_history 

end
