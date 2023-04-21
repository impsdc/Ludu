# LUDU BACKEND deployement

## NEEDED

- Put your ssh public key in the .ssh/authorized_key file on the server

- Configure your local ansible hosts by adding at the end of your etc/ansible/hosts : \
  [luduBackend]\
  your.ip.adress.

- Ensure that you have the correct server/static/images/ from the seeders

- Ensure that your have the correct DB production mongo URL in your ./server/.env

## COMMAND to deploy

```bash
cd ./server && npm run build
cd ../ansible
./startAnsible.sh
```
