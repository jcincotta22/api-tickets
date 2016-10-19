class AddColumnEventId < ActiveRecord::Migration[5.0]
  def up
    add_column :saved_events, :event_id, :string
  end

  def down
    remove_column :saved_events, :event_id
  end
end
