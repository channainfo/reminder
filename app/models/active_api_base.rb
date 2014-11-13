module ActiveApiBase
  extend ActiveSupport::Concern
 
  included do
    require "addressable/uri"
    include Virtus.model
    extend  ActiveModel::Naming
    extend  ActiveModel::Translation
    include ActiveModel::Conversion
    include ActiveModel::Validations
  end
 
  def persisted?
    id.present?
  end

  def assign_errors(error_data)
    error_data[:errors].each do |attribute, attribute_errors|
      attribute_errors.each do |error|
        self.errors.add(attribute, error)
      end
    end
  end

  module ClassMethods
    def find(id)
      response = Typhoeus.get("#{base_url}/#{id}",  body: embed(), headers: request_header)
      if response.success?
        data = JSON.parse(response.body, symbolize_names: true)
        return self.new(data)
      else
        return nil
      end
    end
 
    def query_string parameters
      parameters.reject!{ |key, value| value.blank? }

      Addressable::URI.new.tap do |uri|
        uri.query_values = parameters
      end.query
    end

    def where(parameters={})
      query = query_string parameters
 
      response = Typhoeus.get("#{base_url}?#{query}", body: embed(), headers: request_header)
      if response.success?
        data = JSON.parse(response.body, symbolize_names: true)
        return data.map{ |record| self.new(record) }
      # else
      #   raise ApiException.new('Could not connect to remote server')
      end
    end
 
    alias_method :all, :where
 
    def create(attributes={})
      response = Typhoeus::Request.post(base_url, body: embed(attributes), headers: request_header)
      data = JSON.parse(response.body, symbolize_names: true)
      if response.success?
        object = self.new(data)
      # else
      #   raise ApiException.new('Could not connect to remote server')
      end
    end
 
    def update(id, attributes={})
      object = self.new(attributes.merge(id: id))
      response = Typhoeus::Request.put("#{base_url}/#{id}", body: embed(attributes), headers: request_header)
      data = JSON.parse(response.body, symbolize_names: true)
      response.success?
    end
 
    def destroy(id)
      response = Typhoeus::Request.delete("#{base_url}/#{id}", body: embed, headers: request_header)
      response.success?
    end
    
    def embed(attributes={})
      params = attributes.merge({email: ActiveApi.email, token: ActiveApi.auth_token})
      JSON.generate(params)
    end

    def request_header
      {"content-type" => "application/json", "Accept" => "application/json"}
    end

    def controller_name
      self.name.demodulize.underscore.downcase.pluralize
    end
 
    def base_url
      ActiveApi.endpoint + "/" + controller_name
    end
 
  end
end