require 'rails_helper'

RSpec.describe "login page", :type => :feature do
  it "displays the user's username after successful login" do
  	sign_in

    expect(page).to have_content("kakada@instedd.org")
  end
end