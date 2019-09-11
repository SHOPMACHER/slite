const chokidar = require('chokidar');
const debounce = require('lodash.debounce');

const makeAbsolute = require('../utils/make-absolute');
const deploy = require('../core/deploy');

const watch = (config) => {
    const watcher = chokidar.watch('.', {
        persistent: true,
        cwd: makeAbsolute(config.distPath, config.cwd),
        usePolling: true,
        interval: 250,
        ignored: [
            'styles/**/*',
            'scripts/**/*',
        ],
    });

    watcher.on('change', (path) => deploy([ path ]));
};

module.exports = (program, config) => {
    program
        .command('watch')
        .description('Watches files and uploads changed ones')
        .action(watch.bind(this, config));
};
