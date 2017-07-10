install:
	npm install

start:
	npm run nodemon -- --exec babel-node 'src/index.js'

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