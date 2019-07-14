# coding: utf-8
module Jekyll
  module ReferFilters
    def refer(input, *args)
      site = @context.registers[:site]
      refer_key = site.config["refer"]["key"]
      default_value = site.config["refer"]["default_value"]
      options = alist_to_hash(args)
      pages = site.pages + site.posts.docs
      page = find_page(pages, refer_key, input, options) ||
             find_page(pages, refer_key, default_value, options)
      return page
    end
    def refer_url(input)
      # input must be a page
      return input["url"]
    end
    def refer_link(input, text=nil, prefix="")
      # input must be a page
      page = input
      url = refer_url(page)
      # Jekyll::Filters::URLFilters.absolute_url ってそのまま呼び出せるの？extend?
      url = absolute_url(refer_url(page)) # baseurl + refer_url(page) の方が良くない？
      if text then
        link_text = text
      elsif page["title"]
        link_text = prefix + page["title"]
      else
        url
      end
      # text = text || page["title"] || url
      return "<a href=\"#{url}\">#{link_text}</a>"
    end

    private

    def alist_to_hash(alist)
      # alist = association list (from lisp)
      if alist.length % 2 != 0 then
        raise "alist.length must be even!"
      end
      hash_result = {}
      (0...(alist.length / 2)).each do |i|
        hash_result[alist[2*i]] = alist[2*i+1]
      end
      return hash_result
    end
    def find_page(pages, refer_key, ref, options)
      pages_filtered = pages
                         .select{|page| options.keys.all?{|key| page.data[key] == options[key]}}
                         .select{|page| page.data[refer_key] == ref }
      if pages_filtered.length == 0 then
        return nil
      elsif pages_filtered.length == 1 then
        return pages_filtered[0]
      else
        raise "too many pages matched"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::ReferFilters)