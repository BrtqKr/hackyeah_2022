docker kill strapi
docker rm --force strapi
docker rm --force strapi:v1
docker rm --force strapi:latest
docker image rm --force  strapi
docker image rm --force  strapi:v1
docker load -i strapi.tar
docker run -p "80:1337" -d  --name strapi strapi:latest
