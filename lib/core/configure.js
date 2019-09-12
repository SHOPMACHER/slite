const { existsSync } = require('fs');
const { join } = require('path');

const defaults = {
    cwd: process.cwd(),
    themePath: 'src',
    distPath: 'dist',
    ignored: [],
};

module.exports = () => {
    const configPath = join(process.cwd(), 'slite.config.js');
    const config = existsSync(configPath) ? require(configPath) : {};

    return {
        ...defaults,
        ...config,
    };
};
