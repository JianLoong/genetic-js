module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    bundle: "./src/domain/index.ts",
    //worker: "./src/samples/worker.ts"
  },
  output: {
    filename: "[name].js",
    library: "geneticjs",
    libraryTarget: "window"
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
          },
        },
      },
    ],
  },
};
