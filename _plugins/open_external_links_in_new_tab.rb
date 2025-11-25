# If the configuration sets `open_external_links_in_new_tab` to a truthy value,
# add 'target=_blank' to anchor tags that link to external domains
# Auto-detects external links by URL pattern instead of requiring CSS classes

# frozen_string_literal: true
require 'nokogiri'
require 'uri'

Jekyll::Hooks.register [:notes], :post_convert do |doc|
  convert_links(doc)
end

Jekyll::Hooks.register [:pages], :post_convert do |doc|
  # jekyll considers anything at the root as a page,
  # we only want to consider actual pages
  next unless doc.path.start_with?('_pages/')
  convert_links(doc)
end

def convert_links(doc)
  open_external_links_in_new_tab = !!doc.site.config["open_external_links_in_new_tab"]

  if open_external_links_in_new_tab
    parsed_doc = Nokogiri::HTML::DocumentFragment.parse(doc.content)

    # Get all links except footnote links
    parsed_doc.css("a:not(.footnote):not(.reversefootnote)").each do |link|
      href = link.get_attribute('href')

      # Skip if no href
      next unless href

      # Determine if link is external
      is_external = external_link?(href, doc.site.config["baseurl"])

      # Only add target="_blank" to external links
      if is_external
        link.set_attribute('target', '_blank')
        link.set_attribute('rel', 'noopener noreferrer') # Security best practice
      end
    end

    doc.content = parsed_doc.inner_html
  end
end

def external_link?(href, baseurl)
  # Internal link patterns:
  # - Starts with / (absolute path on same site)
  # - Starts with # (anchor on same page)
  # - Starts with baseurl (if configured)
  # - Relative path (no protocol, no //)

  # External link patterns:
  # - Starts with http:// or https://
  # - Starts with //

  return false if href.start_with?('#')           # Anchor link
  return false if href.start_with?('/')           # Absolute internal path
  return false if baseurl && !baseurl.empty? && href.start_with?(baseurl)  # Baseurl path

  # Check if it's a protocol-relative or absolute URL
  begin
    uri = URI.parse(href)
    # If it has a scheme (http, https, mailto, etc.) or host, it's external
    return true if uri.scheme || uri.host
  rescue URI::InvalidURIError
    # If we can't parse it, assume it's a relative internal link
    return false
  end

  # If we get here, it's a relative path (internal)
  false
end
