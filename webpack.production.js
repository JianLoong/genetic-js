module.exports = {
    mode: "production",
    entry: {
      bundle: "./src/index.ts",
      //worker: "./src/samples/worker.ts"
    },
    output: {
      filename: "geneticjs.umd.min.mjs",
      library: "geneticjs",
      libraryTarget: "umd",
      globalObject: "this"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            compilerOptions: {
              module: "esnext",
              sourceMap: false
            },
          },
        },
      ],
    },
  };
  