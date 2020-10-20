module.exports = {
  entry: {
    main: "./src/js/main.js",
    signup: "./src/js/signup.js",
    signin: "./src/js/signin.js",
    app: "./src/js/app.js",
    reading: "./src/js/reading.js",
    profile: "./src/js/profile.js",
    books: "./src/js/books.js"
  },
  output: {
    path: `${__dirname}/dist/js`,
    filename: "[name].min.js"
  },
  watch: false,
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};