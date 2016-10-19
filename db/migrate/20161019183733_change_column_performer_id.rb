class ChangeColumnPerformerId < ActiveRecord::Migration[5.0]
  def change
    change_column :tickets, :performer_id, :string
  end
end
