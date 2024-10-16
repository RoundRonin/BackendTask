# BackendTask
Elasticsearch Backend task using node.js.

App is developed using docker and can be potentially deployed via docker if deployment images and compose are created.
Currently app is capable of allowing post, search and patch of docment data.
Tests are succesfull overall, though some issues with test implementation are still to be worked on.
Testing was also done manually via thunder client in VScode.

# Build, run 

## Before running...

Create .env file at the root of the project and store variables there

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=foobarbarfoo
POSTGRES_DB=postgres_db
ELASTICSEARCH_HOST=http://elasticsearch:9200
POSTGRES_HOST=postgres
LOGGING=false
```

For your convenience there is a makefile provided
To run the project use 
```shell
make build # to build images
make up # to run containers

```

docker will do it's thing and you'll be able to connect via port 3000

To use docker in Russia there are numerous options. One of them is to in /etc/docker/daemon.json set 

```JSON
"registry-mirrors": ["https://mirror.gcr.io"]
```

# Test

Jest is used for testing.
To run tests you need to use another command provided via makefile
``` shell
make test # to test
```


