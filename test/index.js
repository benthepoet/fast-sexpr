const assert = require('assert');

const { parse } = require('../');

describe('Parser', function () {

  it('should parse symbols', function () {
    const sexpr = '(a bc d-ef :hij-k)';
    const list = parse(sexpr).pop();
    
    assert(list.length === 4, 'List does not contain correct number of elements.');
    assert(list[0] === 'a', 'Symbol \'a\' was not found.');
    assert(list[1] === 'bc', 'Symbol \'bc\' was not found.');
    assert(list[2] === 'd-ef', 'Symbol \'def\' was not found.');
    assert(list[3] === ':hij-k', 'Symbol \':hij-k\' was not found.');
  });
  
  it('should parse strings', function () {
    const sexpr = '("" "abc" "def hij")';
    const list = parse(sexpr).pop();
    
    assert(list.length === 3, 'List does not contain correct number of elements.');
    assert(list[0] === '', 'String \'\' was not found.');
    assert(list[1] === 'abc', 'String \'abc\' was not found.');
    assert(list[2] === 'def hij', 'String \'def\' was not found.');
  });

});