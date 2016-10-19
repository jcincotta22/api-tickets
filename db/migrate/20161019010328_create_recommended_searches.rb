class CreateRecommendedSearches < ActiveRecord::Migration[5.0]
  def change
    create_table :recommended_searches do |t|
      t.string :site, null: false
      t.string :keyword, null: false
      t.string :date
      t.string :end_date
      t.string :zip, null: false
      t.string :performer_id, null: false
      t.belongs_to :user, null: false
      t.belongs_to :search_history
      t.timestamps
    end
  end
end
