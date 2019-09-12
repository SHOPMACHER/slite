const deploy = require('./deploy');
const watch = require('./watch');

/**
 * Register all tasks with commander.
 *
 * @param program Commander program
 * @param config Global config
 */
module.exports = (program, config) => {
    deploy(program, config);
    watch(program, config);
};
