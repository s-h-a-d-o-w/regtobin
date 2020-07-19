const fs = require('fs');
const readline = require('readline');

const input = process.argv[2];
const output = input.replace('.reg', '.bin');
const lineReader = readline.createInterface({
  input: fs.createReadStream(input, { encoding: 'ucs2' })
});

const content = [];

let hasHexContentStarted = false;
lineReader.on('line', function (line) {
  // console.log('Line from file:', line);

  if (line.indexOf('hex:') >= 0) {
    hasHexContentStarted = true;
    line = line.substr(line.indexOf('hex:') + 4);
  }

  if (hasHexContentStarted) {
    for (const piece of line.split(',')) {
      const value = parseInt(piece, 16);
      if (!isNaN(value)) {
        content.push(value);
      }
    }
  }
});

lineReader.on('close', function () {
  console.log(`Writing the following buffer to ${output}:`, content);
  const file = fs.openSync(output, 'w');
  fs.writeSync(file, Buffer.from(content));
  fs.closeSync(file);
});
