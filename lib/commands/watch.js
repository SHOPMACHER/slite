const chokidar = require('chokidar');
const signale = require('signale');

const absolute = require('../utils/absolute-path');
const deploy = require('../core/deploy');

/**
 * Creates a chokidar watcher that deploys changed files to Shopify.
 *
 * @param config {{}} Global configuration
 * @param env {string} Environment
 */
const watch = (config, env) => {
    const watcher = chokidar.watch('.', {
        cwd: absolute(config.srcDir, config.cwd),
        persistent: true,
        usePolling: true,
        interval: 250,
        ignored: config.ignored,
    });

    signale.watch(`Slite is now watching '${config.srcDir}'...`);

    watcher.on('change', async (path) => {
        signale.info(`${path} changed.`);

        try {
            await deploy({
                files: [path],
                env,
            }, {
                cwd: absolute(config.srcDir, config.cwd),
            });

            signale.success('Uploaded files.');
        } catch (err) {
            signale.fatal(err);
        }
    });
};

/**
 * Registers the `watch` command with commander.
 *
 * @param program Commander program
 * @param config {{}} Global configuration
 */
module.exports = (program, config) => {
    program
        .command('watch')
        .description('Watches files and uploads changed ones')
        .option('-e, --env', 'Environment')
        .action((env) => {
            watch(config, env);
        });
};
