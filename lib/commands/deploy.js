const signale = require('signale');

const deploy = require('../core/deploy');
const absolute = require('../utils/absolute-path');

/**
 * Registers the `deploy` command with commander.
 *
 * @param program Commander program
 * @param config {{}} Global configuration
 */
module.exports = (program, config) => {
    program
        .command('deploy')
        .description('Deploys all files')
        .option('-e, --env', 'Environment')
        .action(async (env) => {
            try {
                await deploy({
                    env,
                }, {
                    cwd: absolute(config.srcDir, process.cwd()),
                });

                signale.success('Deployed theme.');
            } catch (err) {
                signale.fatal(err);
            }
        });
};
