function Reader(sexpr) {
  this.i = 0;
  this.len = sexpr.length;
  this.sexpr = sexpr;
}

Reader.prototype.getc = function () {
  if (this.i == this.len) return null;
  return this.sexpr[++this.i];
}

Reader.prototype.ungetc = function () {
  if (this.i > 0) this.i--;
}

Reader.prototype.read_value = function (terminator) {
  var c, str = '';
  while (!terminator(c = this.getc())) {
    str += c;
  }
  return str;
}

module.exports = {
  parse: function (sexpr) {
    return parse(new Reader(sexpr));
  }
}

function is_string_term(c) {
  return !c 
    || c == '"';
}

function is_list_term(c) {
  return !c 
    || is_space(c) 
    || c == '(' 
    || c == ')';
}

function is_space(c) {
  return c == ' ' 
    || c == '\n' 
    || c == '\r' 
    || c == '\t' 
    || c == '\f' 
    || c == '\v';
}

function parse(reader) {
  var c, lst = [];

  while (c = reader.getc()) {
    if (c == ')') {
      break;
    } else if (c == '(') {
      lst.push(parse(reader));
    } else if (c == '"') {
      lst.push(reader.read_value(is_string_term));
    } else if (!is_space(c)) {
      reader.ungetc();
      lst.push(reader.read_value(is_list_term));
    }
  }
  
  return lst;
}