# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20141111083958) do

  create_table "groups", force: true do |t|
    t.string   "name"
    t.text     "addresses"
    t.integer  "account_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "project_id"
  end

  create_table "instances", force: true do |t|
    t.string   "name"
    t.string   "url"
    t.string   "end_point"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schedules", force: true do |t|
    t.integer  "group_id"
    t.text     "channels"
    t.integer  "call_flow_id"
    t.date     "start_date"
    t.text     "conditions"
    t.string   "from"
    t.string   "to"
    t.string   "retries_in_hours"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
    t.boolean  "is_repeated",      default: false
    t.integer  "project_id"
  end

  add_index "schedules", ["account_id"], name: "index_schedules_on_account_id", using: :btree

end
