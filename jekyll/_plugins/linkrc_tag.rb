require 'pathname'
require 'pdf/reader'

module LinkResource
  class LinkResourceTag < ::Liquid::Tag
    def initialize(tag_name, text, tokens)
      super(tag_name, text, tokens)
      @path = text.strip
    end

    def render(context)
      site = context.registers[:site]
      relpath = Pathname.new(site.config["linkrc"]["resource_dir"]) / @path
      # anchor tag
      url = Pathname.new("/") / relpath
      anchor = get_anchor_tag(url)
      # filesize
      fullpath = Pathname.new(site.source) / relpath
      size_str = get_size_str(fullpath)
      # page count
      page_count = get_page_count(fullpath)
      return "#{anchor} (#{size_str}MB#{page_count})"
    end

    def get_size_str(path)
      filesize_byte = File.size(path)
      filesize_megabyte = filesize_byte.to_f / 2**20
      return '%.1f' % filesize_megabyte
    end

    def get_page_count(fullpath)
      if fullpath.extname == '.pdf'
        count = PDF::Reader.new(fullpath).page_count
        return ", #{count} pages"
      else
        return ''
      end
    end

    def get_anchor_tag(url)
      return "<a href=\"#{url}\" target=\"_blank\">#{url.basename}</a>"
    end
  end
end

Liquid::Template.register_tag('linkrc', ::LinkResource::LinkResourceTag)
