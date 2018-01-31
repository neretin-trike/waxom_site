#!/usr/bin/env ruby
# Script to watch a directory for any changes to a haml file
# and compile it.
#
# USAGE: ruby haml_watch.rb <directory_to_watch> [output_directory]
#
# Blake Smith / http://blakesmith.github.com/2010/09/05/haml-directory-watcher.html
#

require 'rubygems'
require 'fssm'

from_path  = ARGV[0] || "src"
to_path    = ARGV[1] || "bin"

puts "Watching #{from_path}"

dir = File.join(File.dirname(__FILE__), from_path)

FSSM.monitor(dir, '**/*.slim') do
  update do |base, relative|
    puts "Test #{from_path}"
    input   = File.join(base, relative)
    output  = File.join(File.dirname(base), to_path, relative.gsub!('.slim', '.html'))
    command = "slimrb #{input} #{output} --pretty"
    %x{#{command}}
    puts <<-eos
HTML gerado #{Time.now.strftime("%Y/%m/%d %H:%M")}:
  - from: #{input}
  - to: #{output}

    eos
  end
end