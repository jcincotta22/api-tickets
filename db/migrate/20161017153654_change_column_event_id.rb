class ChangeColumnEventId < ActiveRecord::Migration[5.0]
  def change
    change_column :tickets, :event_id, :string
  end
end
