#!/usr/bin/env node
const program = require('commander');

const configure = require('./core/configure');
const registerCommands = require('./commands');

const config = configure();
registerCommands(program, config);

program.parse(process.argv);
