class AddColumnEndDate < ActiveRecord::Migration[5.0]
  def up
    add_column :tickets, :end_date, :string, null: false
  end

  def down
    remove_column :tickets, :end_date
  end
end
