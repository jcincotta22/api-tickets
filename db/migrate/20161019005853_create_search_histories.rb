class CreateSearchHistories < ActiveRecord::Migration[5.0]
  def change
    create_table :search_histories do |t|
      t.belongs_to :user, null: false
      t.belongs_to :ticket, null: false
      t.timestamps
    end
  end
end
