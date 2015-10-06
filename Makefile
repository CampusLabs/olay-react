BIN=node_modules/.bin/
COGS=$(BIN)cogs

dev:
	npm install
	$(COGS) -w examples/index.es6,olay-react.es6
