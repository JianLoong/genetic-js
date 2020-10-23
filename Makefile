build: prepare
	npx tsc --outDir out ./main.ts
demo: prepare
	rm -rf ./out
	npx tsc --downlevelIteration --outDir out ./src/samples/nqueen.ts
	node ./out/samples/nqueen.js
prepare:
	mkdir -p ./out

test: npm install --save-dev mocha
	