class Api::SeatGeekController < ApiController
  def index
    seatgeek = SeatGeek.all
    render json: { groceries: groceries }, status: :ok
  end

  def create
    seatgeek = SeatGeek.new(seatgeek_params)
    if event.save
      render json: { event: event }, status :created
    else
      render json: { errors: event.errors }, status: :unprocessable_entity
    end
  end

  private

end
