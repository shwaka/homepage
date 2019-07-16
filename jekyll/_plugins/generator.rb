module Jekyll
  class HelloWorldPage < Page
    def initialize(site, base, dir, name, color)
      @site, @base, @dir, @name = site, base, dir, name
      self.process(@name)
      self.read_yaml(File.join(@base, "assets/css"), "template.scss")
      self.data["base-color"] = color
    end
  end
  class TestGenerator < Generator
    safe true
    def generate(site)
      n = site.config["num_styles"]
      (0...n).each do |i|
        name = "style#{i}.scss"
        hue = 360 * i / n
        color = "hsl(#{hue}, 30%, 50%)"
        site.pages << HelloWorldPage.new(site, site.source, "assets/css", name, color)
      end
    end
  end
end
