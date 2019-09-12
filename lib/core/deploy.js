const themekit = require('@shopify/themekit');

module.exports = (files = [], env = 'development') => {
    return themekit.command('deploy', {
        env,
        files,
    });
};
