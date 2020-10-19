build: prepare
	npx tsc --outDir out ./main.ts
demo: prepare
	rm -rf ./out
	npx tsc --outDir out ./main.ts
	node ./out/main.js
prepare:
	mkdir -p ./out