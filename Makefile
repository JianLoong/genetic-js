build: prepare
	npx tsc --outDir out ./main.ts
demo: prepare
	rm -rf ./out
	npx tsc --outDir out ./src/samples/index.ts
	node ./out/samples/index.js
prepare:
	mkdir -p ./out

test: npm install --save-dev mocha
	