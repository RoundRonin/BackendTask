# BackendTask
Elasticsearch Backend task using node.js


# Build, run 

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
