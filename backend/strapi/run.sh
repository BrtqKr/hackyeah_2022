rm -f prodd/strapi.tar
docker build -t strapi .
docker save -o ./prodd/strapi.tar strapi
cp .env ./prodd
rsync -avz --progress ./prodd root@188.68.236.47:/root/hackyeah
