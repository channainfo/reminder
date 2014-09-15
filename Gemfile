source 'https://rubygems.org'
ruby '2.1.0'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.1'
# Use mysql as the database for Active Record
gem 'mysql2'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.3'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem 'therubyracer',  platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'

# Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
gem 'spring',        group: :development

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

gem 'her'
gem 'typhoeus'
gem 'virtus'

gem 'bootstrap-sass'

gem "exception_handler"

#Sprockets (what Rails 3.1 uses for its asset pipeline) supports LESS
# gem 'bootstrap-sass', require: true

gem 'kaminari'
gem 'bootstrap-kaminari-views'
gem 'addressable'
gem 'simple_form'
gem "twitter-bootstrap-rails"

gem 'whenever', require: false
gem 'thin'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', '~> 0.4.0', require: false
end

group :development do
  gem 'capistrano', '~> 3.0', require: false
  gem 'capistrano-rails',   '~> 1.1', require: false
  gem 'capistrano-bundler', '~> 1.1', require: false

  gem 'capistrano-rvm',   '~> 0.1', require: false
  # gem 'capistrano-rbenv', '~> 2.0', require: false
  # gem 'capistrano-chruby', github: 'capistrano/chruby', require: false
end

# gem 'debugger', group: [:development, :test]
group :test, :development do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'vcr'
  gem 'fakeweb'
  gem 'poltergeist'

  gem 'rspec_api_documentation', github: 'zipmark/rspec_api_documentation'
  gem 'apitome'
  gem 'debugger'
end

group :test do
  gem 'capybara'
  gem 'database_cleaner'
  gem 'shoulda-matchers'
  gem 'simplecov', '~> 0.7.1', require: false
end

