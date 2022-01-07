module.exports = {
    devServer: {
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        watchOptions: {
            poll: false
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