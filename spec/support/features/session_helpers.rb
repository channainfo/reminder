module Features
  module SessionHelpers
    def sign_in
      visit sign_in_path
      fill_in 'Email', with: ENV["EMAIL"]
      fill_in 'Password', with: ENV["PASSWORD"]
      click_button 'Sign in'
    end

    def construct_link url
    	# "#{ENV["HOST"]}/#/#{url}"
    	"/#{url}"
    end
  end
end