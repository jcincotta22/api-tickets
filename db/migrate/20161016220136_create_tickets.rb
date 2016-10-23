class CreateTickets < ActiveRecord::Migration[5.0]
  def change
    create_table :tickets do |t|
      t.string :site
      t.string :keyword, null: false
      t.string :date
      t.integer :event_id
      t.timestamps
    end
  end
end
