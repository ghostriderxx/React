const path = require("path");

// path.join
const p1 = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
console.log(p1);

const p2 = path.join('./a', './b');
console.log(p2);

// path.resolve
const p3 = path.resolve('/foo/bar', './baz');
console.log(p3);

const p4 = path.resolve('/foo/bar', '/tmp/file/');
console.log(p4);

const p5 = path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
console.log(p5);