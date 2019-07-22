# coding: utf-8

module Jekyll
  module IncludeMdFilter
    def include_md(page)
      site = @context.registers[:site]
      liquid_options = site.config["liquid"]
      template = site.liquid_renderer.file(page["path"]).parse(page["content"])
      info = {
        :registers => { :site => site, :page => page},
        :strict_filters => liquid_options["strict_filters"],
        :strict_variables => liquid_options["strict_variables"],
      }
      rendered_md = template.render!(@context, info)
      # return rendered_md
      # convert markdown to html
      # converter = site.converters[0]
      converter = site.converters.find{|conv| conv.matches(".md")}
      return converter.convert(rendered_md)
    end
  end
end

Liquid::Template.register_filter(Jekyll::IncludeMdFilter)
