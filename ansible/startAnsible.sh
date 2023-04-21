#!/bin/bash

rm -rf ./luduBackend/files/server.tgz
file_name="luduBackend/files/server.tgz"
folders_and_files="../server/dist  ../server/static ../server/node_modules ../server/docker ../server/package.json ../server/.env ../server/docker-compose.yml ../server/Dockerfile"
tar -czf $file_name $folders_and_files
if [ $? -eq 0 ]; then
  echo "Archive $file_name was created successfully."
else
  echo "Error creating archive $file_name."
fi
ansible-playbook luduPlaybook.yml -v 