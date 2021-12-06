module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/dist/'
      : '/',
  devServer: {
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    watchOptions: {
      poll: true
    },
  },
  lintOnSave: false,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "EMS - Employee Management System";
      return args;
    });
  },
};
