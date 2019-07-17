module Jekyll
  class HelloWorldPage < Page
    def initialize(site, base, dir, name, color, dark_mode)
      @site, @base, @dir, @name = site, base, dir, name
      self.process(@name)
      self.read_yaml(File.join(@base, "assets/css"), "template.scss")
      self.data["base-color"] = color
      self.data["dark-mode"] = dark_mode
    end
  end
  class TestGenerator < Generator
    safe true
    def generate(site)
      n = site.config["num_styles"]
      [true, false].each do |dark_mode|
        (0...n).each do |i|
          if dark_mode
            name = "style#{i}-dark.scss"
          else
            name = "style#{i}.scss"
          end
          hue = 360 * i / n
          color = "hsl(#{hue}, 30%, 50%)"
          site.pages << HelloWorldPage.new(site, site.source, "assets/css", name, color, dark_mode)
        end
      end
    end
  end
end
