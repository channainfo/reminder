require 'rails_helper'

RSpec.describe GroupsController, :type => :controller do
  include ControllerHelpers

  describe "create" do
  	context "valid params" do
  		it "response 200" do
        sign_in(account)

        post :create, format: :json, group: {name: "foo", addresses: [1000], account_id: 1}
        expect(response.status).to eq 200
      end
  	end
  end
end
