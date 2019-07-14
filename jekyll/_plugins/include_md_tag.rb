module Jekyll
  class IncludeMdTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @ref = text.strip()
    end

    def render(context)
      current_page = context.registers[:page]
      lang = current_page["lang"]
      site = context.registers[:site]
      pages_posts = (site.pages + site.posts.docs).select{|page|
        page["ref"] == @ref and page["lang"] == lang
      }
      if pages_posts.length > 1 then
        raise "too many pages or posts with ref=#{@ref}, lang=#{lang}"
      elsif pages_posts.length == 1 then
        page = pages_posts[0]
        liquid_options = site.config["liquid"]
        template = site.liquid_renderer.file(page.path).parse(page.content)
        info = {
          :registers => { :site => site, :page => page},
          :strict_filters => liquid_options["strict_filters"],
          :strict_variables => liquid_options["strict_variables"],
        }
        rendered_md = template.render!(context, info)
        # return rendered_md
        # convert markdown to html
        # converter = site.converters[0]
        converter = site.converters.find{|conv| conv.matches(".md")}
        puts converter
        return converter.convert(rendered_md)
      else
        raise "not found: page or post with ref=#{@ref}, lang=#{lang}"
      end
    end
  end
end

Liquid::Template.register_tag("include_md", Jekyll::IncludeMdTag)
