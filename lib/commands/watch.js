const chokidar = require('chokidar');
const signale = require('signale');
const debounce = require('lodash.debounce');

const absolute = require('../utils/absolute-path');
const deploy = require('../core/deploy');

/**
 * Creates a chokidar watcher that deploys changed files to Shopify.
 *
 * @param config {{}} Global configuration
 * @param env {string} Environment
 */
const watch = (config, env) => {
    const files = [];
    const watcher = chokidar.watch('.', {
        cwd: absolute(config.srcDir, config.cwd),
        persistent: true,
        usePolling: true,
        interval: 250,
        ignored: config.ignored,
    });

    signale.watch(`Slite is now watching '${config.srcDir}'...`);

    const batchDeploy = debounce(async () => {
        if (!files.length) {
            return;
        }

        try {
            await deploy({
                files,
                env,
            }, {
                cwd: absolute(config.srcDir, config.cwd),
            });

            signale.success(`Uploaded ${files.length} files.`);
        } catch (err) {
            signale.fatal(err);
        } finally {
            files.length = 0;
        }
    }, 250);

    watcher.on('change', async (path) => {
        signale.info(`${path} changed.`);
        files.push(path);

        batchDeploy();
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
