const http = require('http');
const xlsx = require('xlsx');
const util = require('util');
function numberToName(number) {
    let table = 'ZABCDEFGHIJKLMNOPQRSTUVWXY';
    let rest = number % 26;
    let res = table[rest];
    while (number > 26) {
        let div = Math.floor(number / 26);
        if (!rest) div--;
        number = div;
        rest = number % 26;
        res = table[rest] + res;
    }
    return res;
}
function nameToNumber(name) {
    let arr = name.split('');
    let res = 0;
    for (let i=0;i < arr.length ; i++){
        res += (arr[i].charCodeAt(0)-64)*Math.pow(26,(arr.length-i-1));
    }
    return res;
}
http.createServer((req, resp) => {
    var file = xlsx.readFile('陆大楼房间信息.xlsx');
    var data = file.Sheets;
    for (let sheet in data)
        if (data[sheet]['!ref']) {
            let end = data[sheet]['!ref'].split(':')[1];
            let endCol = 0;
            end.match(/[A-Z]+/g).forEach( i => endCol+=nameToNumber(i));
            let endRow = parseInt(end.match(/\d+/g)[0]);
            console.log("startCol:" + 1 + "\tendCol:" + endCol);
            console.log("startRow:" + 1 + "\tendRow:" + endRow);
            for (let i = 1; i <= endCol; i++) {
                // for (let x in )
                resp.write('['+data[sheet][numberToName(i)+'1'].w.replace(/\s/g,'')+']');
            }
            resp.write('\n');
            for (let j = 2; j <= endRow; j++) {
                for (let i = 1; i <= endCol; i++) {
                    resp.write('[' + data[sheet][numberToName(i) + j].w + ']');
                }
                resp.write('\n');
            }
        }
    resp.end();
}).listen(8080);
console.log('running at 8080');