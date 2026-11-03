# Run after `bundle exec jekyll build`: bundle exec ruby docs/social-preview/verify.rb
require 'nokogiri'
require 'tmpdir'
require 'fileutils'
require 'jekyll'

root = File.expand_path('../..', __dir__)
Dir.chdir(root)
meta = ->(path) { Nokogiri::HTML(File.read(path)).css('meta').to_h { |m| [m['property'] || m['name'], m['content']] } }
home = meta.call('_site/index.html')
raise 'homepage title' unless home['og:title'].start_with?('Christin Chong, PhD') && home['og:title'] != 'Home'
raise 'image URL' unless home['og:image'] == 'https://christinchong.com/assets/social/christin-chong-v5.jpg'
raise 'image size' unless home['og:image:width'] == '1200' && home['og:image:height'] == '630'
raise 'homepage type' unless home['og:type'] == 'website'
raise 'card' unless home['twitter:card'] == 'summary_large_image'
raise 'about type' unless meta.call('_site/about.html')['og:type'] == 'website'
note = meta.call('_site/favorite-problems.html')
raise 'note type' unless note['og:type'] == 'article'
raise 'note fallback' unless note['og:image'] == home['og:image']
raise 'Kuma regression' unless meta.call('_site/kuma/index.html')['og:image'].end_with?('/assets/kuma/social-preview-v8.jpg')
raise 'excluded mockups' if File.exist?('_site/docs/social-preview/index.html') || File.exist?('_site/output')

Dir.mktmpdir('social-preview-check-') do |tmp|
  source = File.join(tmp, 'source'); dest = File.join(tmp, 'built')
  FileUtils.mkdir_p(File.join(source, '_includes')); FileUtils.mkdir_p(File.join(source, '_layouts'))
  FileUtils.cp('_includes/head.html', File.join(source, '_includes/head.html'))
  File.write(File.join(source, '_layouts/default.html'), '<!doctype html><html>{% include head.html %}<body>{{ content }}</body></html>')
  File.write(File.join(source, 'external.html'), <<~YAML)
    ---
    layout: default
    permalink: /external.html
    title: 'Quotes & "care"'
    description: 'Science & "practice" <em>together</em>'
    image: https://example.com/card.jpg
    image_alt: 'A "portrait" & name'
    ---
  YAML
  File.write(File.join(source, 'local.html'), <<~YAML)
    ---
    layout: default
    permalink: /local.html
    title: Local
    image: /assets/custom.png
    image_width: 800
    image_height: 400
    image_type: image/png
    ---
  YAML
  config = Jekyll.configuration({'config'=>File.join(root,'_config.yml'), 'source'=>source,'destination'=>dest,'plugins'=>[],'quiet'=>true})
  Jekyll::Site.new(config).process
  external = meta.call(File.join(dest,'external.html'))
  raise 'escaped title' unless external['og:title'] == 'Quotes & "care"'
  raise 'escaped description' unless external['og:description'] == 'Science & "practice" together'
  raise 'external image URL' unless external['og:image'] == 'https://example.com/card.jpg'
  raise 'custom alt' unless external['og:image:alt'] == 'A "portrait" & name'
  raise 'unknown image dimensions' if external.key?('og:image:width') || external.key?('og:image:type')
  local = meta.call(File.join(dest,'local.html'))
  raise 'local custom image' unless local['og:image'] == 'https://christinchong.com/assets/custom.png' && local['og:image:width'] == '800' && local['og:image:type'] == 'image/png'
end
puts 'PASS: homepage, standard page, note fallback, Kuma, excluded mockups, escaped text, external image, custom dimensions.'
