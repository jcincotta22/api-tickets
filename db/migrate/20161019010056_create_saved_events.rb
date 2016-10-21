class CreateSavedEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :saved_events do |t|
      t.belongs_to :user, null: false
      t.string :site, null: false
      t.string :keyword
      t.string :date
      t.string :end_date
      t.string :title, null: false
      t.timestamps
    end
  end
end
