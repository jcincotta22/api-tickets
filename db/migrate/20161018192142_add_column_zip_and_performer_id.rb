class AddColumnZipAndPerformerId < ActiveRecord::Migration[5.0]
  def up
    add_column :tickets, :zip, :string
    add_column :tickets, :performer_id, :integer
  end

  def down
    remove_column :tickets, :zip
    remove_column :tickets, :performer_id
  end
end
