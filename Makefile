install:
	npm install

start:
	DEBUG="application:*" npm run nodemon -- --watch src --ext '.js,.pug' --exec npm run gulp -- server

pack:
	npm run webpack --display-error-details

publish:
	npm publish

lint:
	npm run eslint

test:
	npm test

build:
	npm run build

deploy:
	make build
	git add .
	git commit -am 'next'
	git push heroku master

hlogs:
	heroku logs --tail