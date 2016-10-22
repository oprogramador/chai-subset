var chai = require('chai');
var chaiSubsetInOrder = require('../lib/chai-subset-in-order');
global.expect = chai.expect;
chai.use(chaiSubsetInOrder);