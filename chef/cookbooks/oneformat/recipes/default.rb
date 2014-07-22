#
# Cookbook Name:: tio-patinhas
# Recipe:: default

include_recipe "oneformat::dependencies"

app = data_bag_item("#{node.chef_environment}_apps", "oneformat")

if app
  node.set["oneformat"]["version"]    = app['version']
  node.set["oneformat"]["src_dir"]    = "#{node[:oneformat][:home_dir]}/#{app['version']}"
end

user = node[:oneformat][:user]
app_name = node[:oneformat][:app_name]
home_dir = node[:oneformat][:home_dir]

user user do
  shell "/bin/bash"
  home "/home/#{user}"
  supports :manage_home => true
  not_if "id -u #{user}"
end

directory home_dir do
  owner user
  mode "0755"
  recursive true
end

# Write app config file
app_startup = "#{home_dir}/config.json"
template "#{app_startup}" do
  source "config.json.erb"
  owner user
  mode 0644
  variables(
    :port => node[:oneformat][:app_port],
    :parser => node[:oneformat][:app_parser]
  )
end

aws = data_bag_item('aws', 'deploy')

s3_file "#{Chef::Config[:file_cache_path]}/#{node[:oneformat][:remote_file]}" do
  remote_path "/oneformat/#{node[:oneformat][:remote_file]}"
  bucket node[:oneformat][:s3_bucket]
  aws_access_key_id aws['aws_access_key_id']
  aws_secret_access_key aws['aws_secret_access_key']
  action :create
end

execute "release" do
  command <<-EOH
  tar zxf #{Chef::Config[:file_cache_path]}/#{node[:oneformat][:remote_file]}
  chown -R #{user}: package
  mv package #{node[:oneformat][:src_dir]}
  EOH
  not_if { File.exists?(node[:oneformat][:src_dir]) }
end

link "#{node[:oneformat][:home_dir]}/latest" do
  to node[:oneformat][:src_dir]
end

service "pm2-init.sh" do
  action :nothing
end

bash "restart-app" do
  code <<-EOH
  su #{user} -l -c '
  cd #{home_dir}
  sh setup.sh delete 
  sh setup.sh run 
  '
  EOH
  action :nothing
end

bash "install #{app_name}" do
  code "su #{user} -l -c 'cd #{home_dir}/latest && sh setup.sh install'"
  notifies :run, "bash[restart-app]", :delayed
end
