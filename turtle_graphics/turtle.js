//this represent east, south, west, north;
const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];


class Turtle {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.movement = [[x, y]];
        this.direction = 0;
    }

    forward(steps) {
        const movedirections = directions[this.direction];
        for (let i = 1; i <= steps; i++) {
            this.x += movedirections[0] * 1;
            this.y += movedirections[1] * 1;
            this.movement.push([this.x, this.y]);
        }
        return this;
    }

    right() {
        this.direction += 1;
        //reset to 0
        if (this.direction > 3) {
            this.direction = 0;
        }
        return this;
    }

    left() {
        this.direction -= 1;
        //reset to 3
        if (this.direction < 0) {
            this.direction = 3;
        }
        return this;
    }

    allPoints() {
        return this.movement;
    }

    print() {
        let res = "";
        let minX = Number.MAX_VALUE, minY = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE;

        const checkVisit = (x, y) => {
            for (let position of this.movement) {
                if (position[0] == x && position[1] == y) {
                    return true;
                }
            }
            return false;
        }

        for (let point of this.movement) {
            minX = Math.min(0, minX, point[0]);
            minY = Math.min(0, minY, point[1]);
            maxX = Math.max(maxX, point[0]);
            maxY = Math.max(maxY, point[1]);
        }
        // let min = Math.min(0, minX, minY);
        // let max = Math.max(0, maxX, maxY);
        for (let j = minY; j <= maxY; j++) {
            let row = "";
            for (let i = minX; i <= maxX; i++) {
                if (checkVisit(i, j)) {
                    row += "■";
                } else {
                    row += "□";
                }
            }
            row += "\n";
            res += row;
        }
        console.log(res);
        return res;
    }
}

// new Turtle(0, 4)
//     .forward(3)
//     .left()
//     .forward(3)
//     .right()
//     .forward(5)
//     .right()
//     .forward(8)
//     .right()
//     .forward(5)
//     .right()
//     .forward(3)
//     .left()
//     .forward(3)
//     .print();

// const test2 = new Turtle(5, 5)
//     .forward(10)
//     .right()
//     .forward(5)
//     .right()
//     .forward(10)
//     .right()
//     .forward(5)
//     .right()
//     .forward(2)
//     .right()
//     .forward(5)
//     .left()
//     .forward(2)
//     .left()
//     .forward(5);

// // console.log(test2.allPoints());
// test2.print();

// new Turtle(0, 0)
//     .forward(10)
//     .right()
//     .right()
//     .forward(10)
//     .left()
//     .forward(5)
//     .left()
//     .forward(10)
//     .right()
//     .forward(5)
//     .right()
//     .forward(11)
//     .print();

const drawTurtle = (string) => {
    let result = {};
    const command = string.split("-");
    if (command[0].includes("t")) {
        let x = parseInt(command[0].charAt(1));
        let y = parseInt(command[0].charAt(3));
        result = new Turtle(x, y);
    } else {
        result = new Turtle();
    }
    for (let i = 1; i < command.length; i++) {
        let comm = command[i].charAt(0);
        switch (comm) {
            case ("f"):
                let steps = command[i].slice(1);
                result = result.forward(steps);
                break;
            case ("r"):
                result = result.right();
                break;
            case ("l"):
                result = result.left();
                break;
        }
    }
    return result.print();
}

const input = process.argv.slice(2);
if (input[0].includes("--output")) {
    const pathArr = input[0].split("=");
    const fileName = pathArr[1];
    if (fileName === undefined) {
        console.log("No file name entered. Please check!");
    } else {
        const res = drawTurtle(input[1]);
        const fs = require("fs");
        try {
            fs.writeFileSync(fileName, res);
            console.log(`Drawing written to ${fileName}`);
        } catch (err) {
            console.error(err);
        }
    }
} else {
    drawTurtle(input[0]);
}
