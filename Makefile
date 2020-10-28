build: prepare
	npx tsc --outDir dist ./main.ts
demo: prepare
	rm -rf ./dist
	# npx tsc
	yarn build
	cp -r ./dist/* ./site/
	# node ./dist/bundle.js
	http-server ./site/
	# node ./dist/bundle.js
prepare:
	mkdir -p ./dist

test: yarn test
	