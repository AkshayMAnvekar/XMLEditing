var fs = require('fs')

var dir = __dirname + "\\ReWork\\Unit 1"

readFiles(dir)

function readFiles(dirname, onFileContent) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      return console.log(err);
    }
    filenames.forEach(function(filename) {
      fs.readFile( dir +"\\"+ filename, 'utf8', function (err,data) {
        if (err) {
          return console.log("Read Error",err);
        }
        var result = data.replace(' />', '/>');
        var result = data.replace(/(type="element">|<p>|<cell>)(\s{1,})(<img)/g, '$1$3');
        var result = data.replace(/(svg" width="\d{2,}px"[/]>)(\s{1,})(<[/])/g, '$1$3');
        var result = data.replace(/(<fib name="fib\d" type="int"[/]>)(\s{1,})([+])(\s{1,})(<fib name="fib\d" type="int" [/]>)/g, '$1$3$5');
        var result = data.replace(/(<p>)(\s{1,})(<img)/g, '$1$3');

        fs.writeFile(filename, result, 'utf8', function (err) {
          if (err) return console.log(err);
        });
      });
    });
  });
}
