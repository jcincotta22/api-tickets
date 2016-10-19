class CreateSavedEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :saved_events do |t|
      t.belongs_to :user, null: false
      t.belongs_to :search_history, null: false
      t.string :site, null: false
      t.string :keyword, null: false
      t.string :date
      t.string :end_date
      t.timestamps
    end
  end
end
