# BackendTask
Elasticsearch Backend task using node.js


# Build, run 

## Before running...

Create .env file at the root of the project and store variables there

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=foobarbarfoo
POSTGRES_DB=postgres_db
ELASTICSEARCH_HOST=https://localhost:9200
POSTGRES_HOST=postgres
```

For your convenience there is a makefile provided
To run the project use 
```shell
make up
```

docker will do it's thing and you'll be able to connect via port 3000


To use docker in Russia there are numerous options. One of them is to in /etc/docker/daemon.json set 

```JSON
"registry-mirrors": ["https://mirror.gcr.io"]
```

# Test

Jest is used for testing.
To run tests you need to install jest via
``` shell
npm i jest
```


