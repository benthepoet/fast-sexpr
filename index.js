module.exports = function (sexpr) {
  var data = {
    index: 0,
    sexpr: sexpr
  };
  
  return parse(data);
};

function getChar(data) {
  if (data.index === data.sexpr.length) return null;
  return data.sexpr[data.index++];
}

function readValue(data, isTerminator) {
    var c, value = '';
    while (!isTerminator(c = getChar(data))) {
      value += c;
    }
    return value;
  }

function unGetChar(data) {
  data.index--;
}

function isStringTerm(c) {
  return !c 
    || c === '"';
}

function isListTerm(c) {
  return !c 
    || isSpace(c) 
    || c === '(' 
    || c === ')';
}

function isSpace(c) {
  return c === ' ' 
    || c === '\n' 
    || c === '\r' 
    || c === '\t' 
    || c === '\f' 
    || c === '\v';
}

function parse(data) {
  var c, list = [];

  while ((c = getChar(data))) {
    if (c === ')') {
      break;
    } else if (c === '(') {
      list.push(parse(data));
    } else if (c === '"') {
      list.push(readValue(data, isStringTerm));
    } else if (!isSpace(c)) {
      unGetChar(data);
      list.push(readValue(data, isListTerm));
      unGetChar(data);
    }
  }

  return list;
}