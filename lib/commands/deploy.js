const deploy = require('../core/deploy');

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
        .action((env) => {
            deploy([], env);
        });
};
