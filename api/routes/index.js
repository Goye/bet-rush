exports.init = function(app) {
    module.exports = {
        login: require('./login').init(app)
    };
};