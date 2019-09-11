const { isAbsolute, join } = require('path');

module.exports = (path, root = process.cwd()) => {
    return isAbsolute(path)
        ? path
        : join(root, path);
};
