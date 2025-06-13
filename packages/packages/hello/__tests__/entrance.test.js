'use strict';

const entrance = require('..');
const assert = require('assert').strict;

assert.strictEqual(entrance(), 'Hello from entrance');
console.info('entrance tests passed');
