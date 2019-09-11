const { existsSync } = require('fs');
const { join } = require('path');

const makeAbsolute = require('../utils/make-absolute');

const defaults = {
    cwd: process.cwd(),
    themePath: 'src',
    distPath: 'dist',
    ignore: [],
};

const transform = (config) => {
    config.themePath = makeAbsolute(config.themePath);
    config.distPath = makeAbsolute(config.distPath);

    return config;
};

module.exports = () => {
    const configPath = join(process.cwd(), 'slite.config.js');
    const config = existsSync(configPath) ? require(configPath) : {};

    return {
        ...defaults,
        ...config,
    };
};
