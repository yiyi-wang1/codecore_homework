#! /home/nimbus-user/.nvm/versions/node/v17.6.0/bin/node

const drawLine = function (num) {
    let res = "";
    const line = "\u2501";
    for (let i = 0; i < num; i++) {
        res += line;
    }
    return res;
}

const drawTopBorder = function (num) {
    let res = drawLine(num);
    const left = "\u250F";
    const right = "\u2513";
    return left + res + right;
}

const drawMiddleBorder = function (num) {
    let res = drawLine(num);
    const left = "\u2523";
    const right = "\u252B";
    return left + res + right;
}
const drawBottomBorder = function (num) {
    let res = drawLine(num);
    const left = "\u2517";
    const right = "\u251B";
    return left + res + right;
}

const drawBarsAround = function (string) {
    const left = "\u2503";
    const right = "\u2503";
    return left + string + right;
}

const boxIt = function (arr) {
    if (arr.length == 0) {
        return drawTopBorder(0) + "\n" + drawBottomBorder(0);
    }
    let max = arr[0].length;
    for (str of arr) {
        if (str.length > max) {
            max = str.length;
        }
    }
    let res = "";
    res += drawTopBorder(max) + "\n";
    for (let i = 0; i < arr.length; i++) {
        let data = arr[i];
        if (arr[i].length < max) {
            for (let j = 0; j < max - arr[i].length; j++) {
                data += " ";
            }
        }
        if (i == arr.length - 1) {
            res += drawBarsAround(data) + "\n"
            res += drawBottomBorder(max);
        } else {
            res += drawBarsAround(data) + "\n"
            res += drawMiddleBorder(max) + "\n"
        }
    }
    return res;

}

const input = process.argv.slice(2);
if (input.length == 1 && input[0].includes(".csv")) {
    const path = input.toString();
    const fs = require("fs");
    let dataArr = [];
    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            dataArr = data.split("\n").filter(word => word !== "");
        }
        // console.log(dataArr);

        //change to 2D array
        const resArr = [];
        for (row of dataArr) {
            row = row.split(",").filter(word => word !== ",");
            resArr.push(row);
        }
        // console.log(resArr);
        const col = resArr[0].length;
        const newArr = [];

        for (let i = 0; i < col; i++) {

            let maxLen = 0;
            for (row of resArr) {
                // console.log(row[i]);
                if (row[i].length > maxLen) {
                    maxLen = row[i].length;
                }
            }
            for (row of resArr) {
                if (row[i].length < maxLen) {
                    row[i] = row[i] + " ".repeat(maxLen - row[i].length);
                }
            }
        }
        // console.log(resArr);
        const arr = [];
        for (row of resArr) {
            let str = row.join("\u2503");
            arr.push(str);
        }
        console.log(boxIt(arr));
    });

} else {
    console.log(boxIt(process.argv.slice(2)));
}




