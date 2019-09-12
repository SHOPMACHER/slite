const deploy = require('./deploy');
const watch = require('./watch');

module.exports = (program, config) => {
    deploy(program, config);
    watch(program, config);
};
