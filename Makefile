build: prepare
	npx tsc --outDir out ./main.ts
demo: prepare
	rm -rf ./out
	npx tsc --outDir out ./src/samples/basic.ts
	node ./out/samples/basic.js
prepare:
	mkdir -p ./out