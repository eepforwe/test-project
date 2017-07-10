install:
	npm install

start:
	npm run nodemon -- --exec babel-node 'src/bin/index.js'

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