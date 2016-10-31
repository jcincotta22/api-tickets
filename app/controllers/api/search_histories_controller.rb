class Api::SearchHistoriesController < ApiController
  skip_before_action :verify_authenticity_token
  include SearchHistoryHelper
  def index
    user = current_user
    get_search_history(user)
  end

  def delete_all
    user = current_user
    delete_history(user)
  end
end
