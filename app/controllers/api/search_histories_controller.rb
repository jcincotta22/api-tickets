class Api::SearchHistoriesController < ApiController
  skip_before_action :verify_authenticity_token
  include SearchHistoryHelper
  def index
    user = current_user
    get_search_history(user)
  end

  def delete_all
    user = current_user
    if user && !user.search_histories.empty?
      SearchHistory.delete_all(user_id: user.id)
      message = "Your Search History Has Been Deleted"
      render json: { message: message }, status: :ok
    else
      message = "You do not have a search history"
      render json: { message: message }, status: :ok
    end
  end
end
