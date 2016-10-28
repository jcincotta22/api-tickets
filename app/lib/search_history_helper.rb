module SearchHistoryHelper
  def get_search_history(user)
    if user
      search_history = user.search_histories.order(created_at: :desc).limit(10)
      tickets = []
      search_history.each do |history|
        tickets << history.ticket
      end

      if !search_history.empty?
        render json: { searchHistory: tickets }, status: :ok
      else
        render json: { searchHistory: [] }, status: :ok
      end
    else
      render json: { searchHistory: [], message: "You must sign in to view your search history" }, status: :ok
    end
  end

  def delete_history(user)
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
