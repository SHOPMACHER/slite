module.exports = (path, prefix) => {
    return path.replace(`${prefix}\\`, '');
};
