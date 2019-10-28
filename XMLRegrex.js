var fs = require('fs')

var dir = __dirname + "/ReWork/OneDrive_1_26-10-2019/Unit 10"
var dir1 = __dirname + "/ReWork/Unit 10"

readFiles(dir)

async function readFiles(dirname, onFileContent) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      return console.log(err);
    }
    filenames.forEach(function(filename) {
      fs.readFile( dir +"/"+ filename, 'utf8', function (err,data) {
        if (err) {
          return console.log("Read Error",err);
        }
        var result = data.replace(/(\s{1,})([/]>)/g, '$2');
        // var result = data.replace(/(\s{1,})([/]>)/g, '$2');
        result = result.replace(/(<fib )(name="fib\d"[/]>)/g, '$1type="int" $2');
        result = result.replace(/(<fib)( name="fib\d")( type="int")([/]>)/g, '$1$3$2$4');
        console.log(result);
        result = result.replace(/(<fib type="int" name="fib\d"[/]>)(\.)/g, '$1');
        result = result.replace(/(type="element">|<p>|<cell>)(\s{1,})(<img)/g, '$1$3');
        result = result.replace(/(svg" width="\d{2,}px"[/]>)(\s{1,})(<[/])/g, '$1$3');
        result = result.replace(/([/]>)(\s{1,})(<[/]p>)/g, '$1$3');
        result = result.replace(/(<p>)(\s{1,})(<p>)/g, '$1');
        result = result.replace(/(<[/]p>)(\s{1,})(<[/]p>)/g, '$1');
        result = result.replace(/(<fib type="int" name="fib\d"[/]>)(\s{1,})([+])(\s{1,})(<fib type="int" name="fib\d"[/]>)/g, '$1$3$5');
        result = result.replace(/(<fib type="int" name="fib\d"[/]>)(\s{1,})([+])(\s{1,})(<fib type="int" name="fib\d"[/]>)/g, '$1$3$5');
        result = result.replace(/(<p>)(\s{1,})(<img)/g, '$1$3');
        result = result.replace(/([/]>)(\s{1,})(<img)/g, '$1$3');
        result = result.replace(/(<p>)(.*?)(\s{2,})(<fib)/g, '$1$2 $4');
        result = result.replace(/(<p>)(.*?)(\w)(\s{2})(\w)(.*?)(<[/]p>)/g, '$1$2$3 $5$6$7');
        result = result.replace(/(<p>)(.*?)(\s{2,})(.*?)(<[/]p>)/g, '$1$2$4$5');


        fs.writeFile(dir1 +"/"+ filename, result, 'utf8', function (err) {
          if (err) return console.log(err);
        });
      });
    });
  });
}
