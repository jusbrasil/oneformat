# app location
default[:oneformat][:user] = "oneformat"
default[:oneformat][:version] = "0.1.0"
default[:oneformat][:app_name] = "oneformat"
default[:oneformat][:home_dir] = "/opt/#{node[:oneformat][:app_name]}"
default[:oneformat][:s3_bucket] = "jusbrasil-deps"
default[:oneformat][:src_dir] = "#{node[:oneformat][:home_dir]}/#{node['oneformat']['version']}"
default[:oneformat][:remote_file] = "oneformat-#{node['oneformat']['version']}.tgz"

# app env
default[:oneformat][:app_port] = 8888
default[:oneformat][:app_parser] = "wysihtml5"

# node
override[:nodejs][:version] = "0.10.2"
override[:nodejs][:npm] = "1.2.15"

# newrelic
override[:newrelic][:license_key] = "c8dad2a619df6c863b57f656e92b9c2e4bafa650"
