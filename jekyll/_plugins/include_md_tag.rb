# coding: utf-8
# frozen_string_literal: true

module Jekyll
  class IncludeLikeTag < Liquid::Tag
    # {% myinclude post:hoge hoge="fuga" piyo="piyo" %} みたいな形で使えるタグの基底クラス
    # 上の例だと，render の local 変数は次のようになる
    #   arg="post:hoge", params={“hoge”=>”fuga”, “piyo”=>”piyo”}
    VALID_SYNTAX = %r!
        ([\w-]+)\s*=\s*
        (?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([\w\.-]+))
      !x
    VARIABLE_SYNTAX = %r!
        (?<variable>[^{]*(\{\{\s*[\w\-\.]+\s*(\|.*)?\}\}[^\s{}]*)+)
        (?<params>.*)
      !mx

    FULL_VALID_SYNTAX = %r!\A\s*(?:#{VALID_SYNTAX}(?=\s|\z)\s*)*\z!

    def initialize(tag_name, markup, tokens)
      super
      matched = markup.strip.match(VARIABLE_SYNTAX)
      if matched
        @arg = matched["variable"].strip
        @params = matched["params"].strip
      else
        @arg, @params = markup.strip.split(%r!\s+!, 2)
      end
      validate_params if @params
      @tag_name = tag_name
    end

    def syntax_example
      "{% #{@tag_name} file.ext param='value' param2='value' %}"
    end

    def parse_params(context)
      params = {}
      markup = @params

      while (match = VALID_SYNTAX.match(markup))
        markup = markup[match.end(0)..-1]

        value = if match[2]
                  match[2].gsub(%r!\\"!, '"')
                elsif match[3]
                  match[3].gsub(%r!\\'!, "'")
                elsif match[4]
                  context[match[4]]
                end

        params[match[1]] = value
      end
      params
    end

    def validate_params
      unless @params =~ FULL_VALID_SYNTAX
        raise ArgumentError, <<-MSG
Invalid syntax for include tag:

  #{@params}

Valid syntax:

  #{syntax_example}

MSG
      end
    end

    # Render the variable if required
    def render_variable(context)
      if @arg =~ VARIABLE_SYNTAX
        partial = context.registers[:site]
                    .liquid_renderer
                    .file("(variable)")
                    .parse(@arg)
        partial.render!(context)
      end
    end

    # def render(context)
    #   # site = context.registers[:site]
    #   arg = render_variable(context) || @arg

    #   params = parse_params(context)
    #   return "#{arg}, #{params}"
    # end
  end

  class IncludeMdTag < Jekyll::IncludeLikeTag
    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      ref = render_variable(context) || @arg
      return get_html(context, ref)
    end

    def get_html(context, ref)
      current_page = context.registers[:page]
      lang = current_page["lang"]
      site = context.registers[:site]
      pages_posts = (site.pages + site.posts.docs).select{|page|
        page["ref"] == ref and page["lang"] == lang
      }
      if pages_posts.length > 1 then
        raise "too many pages or posts with ref=#{ref}, lang=#{lang}"
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
        return converter.convert(rendered_md)
      else
        raise "not found: page or post with ref=#{ref}, lang=#{lang}"
      end
    end
  end
end

Liquid::Template.register_tag("include_md", Jekyll::IncludeMdTag)
