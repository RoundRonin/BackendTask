DEV_COMPOSE_FILE=docker-compose-dev.yml
TEST_COMPOSE_FILE=docker-compose-test.yml

up:
	docker compose -f ${DEV_COMPOSE_FILE} up 

build:
	docker compose -f ${DEV_COMPOSE_FILE} build 

test:
	docker compose -f ${DEV_COMPOSE_FILE} -f ${TEST_COMPOSE_FILE} run --build app