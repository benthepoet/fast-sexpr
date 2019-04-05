class Reader {
  constructor(sexpr) {
    this.i = 0;
    this.len = sexpr.length;
    this.sexpr = sexpr;
  }

  getc() {
    if (this.i == this.len) return null;
    return this.sexpr[this.i++];
  }
  
  ungetc() {
    this.i--;
  }

  readValue(terminator) {
    var c, str = '';
    while (!terminator(c = this.getc())) {
      str += c;
    }
    return str;
  }
}

module.exports = {
  parse(sexpr) {
    return parse(new Reader(sexpr));
  }
}

function isStringTerm(c) {
  return !c 
    || c == '"';
}

function isListTerm(c) {
  return !c 
    || isSpace(c) 
    || c == '(' 
    || c == ')';
}

function isSpace(c) {
  return c == ' ' 
    || c == '\n' 
    || c == '\r' 
    || c == '\t' 
    || c == '\f' 
    || c == '\v';
}

function parse(reader) {
  var c, list = [];

  while (c = reader.getc()) {
    if (c == ')') {
      break;
    } else if (c == '(') {
      list.push(parse(reader));
    } else if (c == '"') {
      list.push(reader.readValue(isStringTerm));
    } else if (!isSpace(c)) {
      reader.ungetc();
      list.push(reader.readValue(isListTerm));
    }
  }

  return list;
}