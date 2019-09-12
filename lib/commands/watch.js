const chokidar = require('chokidar');

const makeAbsolute = require('../utils/make-absolute');
const deploy = require('../core/deploy');

/**
 * Creates a chokidar watcher that deploys changed files to Shopify.
 *
 * @param config {{}} Global configuration
 * @param env {string} Environment
 */
const watch = (config, env) => {
    const watcher = chokidar.watch('.', {
        persistent: true,
        cwd: makeAbsolute(config.distPath, config.cwd),
        usePolling: true,
        interval: 250,
        ignored: config.ignored,
    });

    watcher.on('change', (path) => deploy(
        [
            path
        ],
        env,
    ));
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
