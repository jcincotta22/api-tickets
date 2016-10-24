class Api::SearchHistoriesController < ApiController
  skip_before_action :verify_authenticity_token

  def index
    user = current_user
    if user
      search_history = user.search_histories.order(created_at: :desc).limit(10)
      tickets = []

      search_history.each do |history|
        tickets << history.ticket
      end

      if !search_history.nil?
        render json: { searchHistory: tickets }, status: :ok
      else
        render json: { searchHistory: [] }, status: :ok
      end
    else
      render json: { searchHistory: [] }, status: :ok
    end
  end

  def delete_all
    user = current_user
    binding.pry
    if user || !user.search_histories.empty?
      SearchHistory.delete_all(user_id: user.id)
      message = "Your Search History Has Been Deleted"
      render json: { message: message }, status: :ok
    else
      message = "You do not have a search history"
      render json: { message: message }, status: :ok
    end
  end
end
