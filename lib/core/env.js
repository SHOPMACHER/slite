const dotenv = require('dotenv');
const { join } = require('path');
const { existsSync } = require('fs');

module.exports = (env = 'development') => {
    const config = {
        config: join(process.cwd(), 'config.yml'),
    };

    const envFile = join(process.cwd(), `.env.${env}`);
    if (!existsSync(envFile)) {
        return config;
    }

    dotenv.config({
        path: join(process.cwd(), `.env.${env}`),
    });

    return {
        ...config,
        store: process.env.SLATE_STORE,
        password: process.env.SLATE_PASSWORD,
        themeid: process.env.SLATE_THEME_ID,
    };
};
