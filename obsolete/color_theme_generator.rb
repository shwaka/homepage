module Jekyll
  class HelloWorldPage < Page
    def initialize(site, base, dir, name, color, lightness)
      @site, @base, @dir, @name = site, base, dir, name
      self.process(@name)
      self.read_yaml(File.join(@base, "assets/css"), "template.scss")
      self.data["base-color"] = color
      self.data["palette-lightness"] = lightness
    end
  end
  class TestGenerator < Generator
    safe true
    def generate(site)
      n = site.config["num_styles"]
      ["light", "dark"].each do |lightness|
        (0...n).each do |i|
          if lightness == "light"
            name = "style#{i}.scss"
          elsif lightness == "dark"
            name = "style#{i}-dark.scss"
          end
          hue = 360 * i / n
          color = "hsl(#{hue}, 30%, 50%)"
          site.pages << HelloWorldPage.new(site, site.source, "assets/css", name, color, lightness)
        end
      end
    end
  end
end
