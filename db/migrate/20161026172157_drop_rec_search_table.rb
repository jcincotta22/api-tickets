class DropRecSearchTable < ActiveRecord::Migration[5.0]
  def change
    drop_table :recommended_searches
  end
end
