const fs = require('fs').promises;
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">"
})

let todoList = [];
const welcome = "Welcome to Todo CLI!\n--------------------";
const menu = "(v) View • ( n ) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit";
const defaultPath = "myTodos.json";

function ask() {
    console.log(menu);
    rl.prompt();
}


function todo() {
    console.log(welcome);
    ask();

    rl.on("line", (line) => {
        switch (line.trim().charAt(0)) {
            case "v":
                if (todoList.length == 0) {
                    console.log("List is empty...");
                } else {
                    todoList.forEach((item, index) => {
                        const completedMark = item.completed ? "[✓]" : "[ ]";
                        console.log(`${index} ${completedMark} ${item.title}`);
                    });
                }
                ask();
                break;
            case "n":
                rl.question("What?\n>", (answer) => {
                    let newItem = {};
                    newItem.title = answer;
                    newItem.completed = false;
                    todoList.push(newItem);
                    ask();
                })
                break;
            case "c":
                const index = parseInt(line.slice(1));
                if (isNaN(index)) {
                    console.log("Please enter the command and index of item");
                } else {
                    item = todoList[index];
                    item.completed = true;
                    console.log(`Completed ${item.title}`);
                }
                ask();
                break;
            case "d":
                const index1 = parseInt(line.slice(1));
                if (isNaN(index)) {
                    console.log("Please enter the command and index of item");
                } else {
                    if (index1 > 0 && index1 < todoList.length) {
                        todoList.splice(index1, 1);
                    } else {
                        console.log("Index is not valid. Please try again!");
                    }
                }
                ask();
                break;
            case "s":
                rl.question("Where?\n>", function (answer) {
                    if (!answer.includes(".")) {
                        answer += ".json";
                    }
                    fs.writeFile(answer, JSON.stringify(todoList))
                        .then(console.log("File write complete!"))
                        .catch(function (error) { console.error(error) })
                    ask();
                });
                rl.write(defaultPath);
                break;
            case "q":
                console.log("See you soon! 😄");
                process.exit(0);
            default:
                console.log("Please enter the correct command");
                rl.prompt();
                break;
        }
    })
}

const jsonFile = process.argv[2];
if (jsonFile) {
    fs.readFile(jsonFile, "utf8")
        .then(data => {
            todoList = JSON.parse(data);
        })
        .catch(err => {
            console.log(err);
        })
    todo();
} else {
    todo();
}