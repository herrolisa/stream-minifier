var fs = require('fs');
var Stream = require('stream');
var util = require('util');
var Transform = require('stream').Transform;

var argv = require('minimist')(process.argv.slice(2));

var read = fs.createReadStream(argv.input, {encoding: 'utf-8'});

var write = fs.createWriteStream(argv.output, {encoding: 'utf-8'});

function ParseCSS(){
  Transform.call(this);
}

util.inherits(ParseCSS, Transform);

ParseCSS.prototype._transform = function (chunk, encoding, next){
  var parsedChunk = chunk.toString().replace(/\s+/g, '');
  this.push(parsedChunk);
  next();
};

var parse = new ParseCSS();

read.pipe(parse).pipe(write);