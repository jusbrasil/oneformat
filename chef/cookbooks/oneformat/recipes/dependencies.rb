#
# Cookbook Name:: oneformat 
# Recipe:: dependencies

include_recipe "runit"
include_recipe "nodejs::install_from_source"
include_recipe "nodejs::npm"
include_recipe "git"

