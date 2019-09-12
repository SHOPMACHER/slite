const { isAbsolute, join } = require('path');

/**
 * Checks is a path is absolute. If not, creates the absolute path and returns
 * it.
 *
 * @param path
 * @param root
 * @returns {string}
 */
module.exports = (path, root = process.cwd()) => {
    return isAbsolute(path)
        ? path
        : join(root, path);
};
