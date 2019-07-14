# coding: utf-8
# frozen_string_literal: true

# {% myinclude post:hoge hoge="fuga" piyo="piyo" %} みたいな形で使えるタグのテンプレート
# 上の例だと，render の local 変数は次のようになる
# arg="post:hoge", params={“hoge”=>”fuga”, “piyo”=>”piyo”}


module Jekyll
  class IncludeLikeTag < Liquid::Tag
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

    def render(context)
      # site = context.registers[:site]
      arg = render_variable(context) || @arg

      params = parse_params(context)
      return "#{arg}, #{params}"
    end
  end
end

# Liquid::Template.register_tag("includelike", Jekyll::IncludeLikeTag)
