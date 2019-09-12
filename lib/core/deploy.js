const themekit = require('@shopify/themekit');
const signale = require('signale');

const env = require('../core/env');

module.exports = (flags = {}, options = {}) => {
    return themekit.command('deploy', {
        ...flags,
        ...env(flags.env),
    }, options);
};
