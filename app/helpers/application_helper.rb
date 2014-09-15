module ApplicationHelper
  def page_index_for paginator, index
    page = params[:page].present? ? params[:page].to_i : 1
    paginator.default_per_page * (page-1) + index + 1
  end

  def new_button text, url, options = {}
    button_icon(text, url, 'icon-plus', options)
  end

  def delete_button text, url, options = {}
    button_icon(text, url, 'icon-trash', options)
  end

  def edit_button text, url, options={}
    button_icon(text, url, 'icon-pencil', options) 
  end

  def button_icon text, url, icon, options = {}
    options[:class] = "btn btn-primary #{options[:class]}"

    link_to url, options do
      content_tag('span', ' ',  class: icon ) + text 
    end
  end

  def page_title_with title
    content_for(:title) do
      title
    end
  end

  def page_title
    title = content_for(:title)
    title.present? ? "#{title} - #{ENV['APP_NAME']}" : ENV['APP_NAME']
  end

  def submit_row &block
     content_tag :div,  class: 'control-group text optional call_rate_note' do
        label = content_tag :label, '' , class: 'text optional control-label'

        button = content_tag :div, class: :control do
          with_output_buffer(&block)
        end

        (label + button)
     end
  end


  def action_bar text, options= {}, &block
    options[:class] = "clearfix header-bar #{options[:class]}"
    content_tag :div, options do

      if block_given?
        content_title = content_tag :div, class: :left do
          content_tag(:h3, text, class: :title)
        end

        output = with_output_buffer(&block)
        content_link = content_tag(:div, output, class: :right )
        content_title + content_link
      else
        content_tag(:h3, text, class: :title)
      end

    end
  end

  def active controller_id
    controller_id == controller_name ? ' active ' : ''
  end
end