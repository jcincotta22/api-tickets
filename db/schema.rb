# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161019183733) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "recommended_searches", force: :cascade do |t|
    t.string   "site",              null: false
    t.string   "keyword",           null: false
    t.string   "date"
    t.string   "end_date"
    t.string   "zip",               null: false
    t.string   "performer_id",      null: false
    t.integer  "user_id",           null: false
    t.integer  "search_history_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["search_history_id"], name: "index_recommended_searches_on_search_history_id", using: :btree
    t.index ["user_id"], name: "index_recommended_searches_on_user_id", using: :btree
  end

  create_table "saved_events", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "site",       null: false
    t.string   "keyword"
    t.string   "date"
    t.string   "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "event_id"
    t.index ["user_id"], name: "index_saved_events_on_user_id", using: :btree
  end

  create_table "search_histories", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "ticket_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ticket_id"], name: "index_search_histories_on_ticket_id", using: :btree
    t.index ["user_id"], name: "index_search_histories_on_user_id", using: :btree
  end

  create_table "tickets", force: :cascade do |t|
    t.string "site"
    t.string "keyword",      null: false
    t.string "date"
    t.string "event_id"
    t.string "zip"
    t.string "performer_id"
    t.string "end_date",     null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",                          null: false
    t.string   "last_name",                           null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
