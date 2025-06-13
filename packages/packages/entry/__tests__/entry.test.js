'use strict';

const entry = require('..');
const assert = require('assert').strict;

assert.strictEqual(entry(), 'Hello from entry');
console.info('entry tests passed');
