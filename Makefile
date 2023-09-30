SHELL=/bin/bash
PHONY=default help reset check eslint-rebuild eslint-build eslint-up eslint-up-fix eslint-down

.PHONY: $(PHONY)

default: help

reset: reset-sample-service
eslint-up: docker-compose-up-eslint
eslint-up-fix: docker-compose-up-eslint-fix
check: check-diff

eslint-rebuild: eslint-down eslint-build
eslint-build: docker-compose-build-eslint
eslint-down: docker-compose-down-eslint

help:
	@echo "Usage: make eslint-(rebuild|build|up|down)"
	@echo "Usage: make (reset|check)"
	@echo "Usage: make help"

reset-sample-service:
	rm -rf /tmp/service
	mv service /tmp
	cp -r service.sample service

check-diff:
	diff -r service.sample service || true

docker-compose-up-eslint-fix:
	FIX_OPTION="--fix" docker compose -p docker-eslint -f ./docker/docker-compose.eslint.yml up --abort-on-container-exit
docker-compose-up-eslint:
	FIX_OPTION="" docker compose -p docker-eslint -f ./docker/docker-compose.eslint.yml up --abort-on-container-exit

docker-compose-build-eslint:
	docker compose -p docker-eslint -f ./docker/docker-compose.eslint.yml build

docker-compose-down-eslint:
	docker compose -p docker-eslint -f ./docker/docker-compose.eslint.yml down --volumes

