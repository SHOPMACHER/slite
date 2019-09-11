const themekit = require('@shopify/themekit');

module.exports = (files = []) => {
    return themekit.command('deploy', {
        files,
    });
};
