require 'rails_helper'

RSpec.describe "New group page", :type => :feature do
	before(:each) do
		sign_in
	end

  it "displays the user's username after successful login", js: true do
  	visit construct_link("groups")
  	click_link "New"

  	fill_in "Name", with: "foo"
  	fill_in "Address", with: "1000"

  	click_button "Save"

    expect(page).to have_content("New group")
  end
end