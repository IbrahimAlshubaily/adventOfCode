import { readFileSync } from "fs";


interface position {
    x : number, 
    y: number,
}
function dayTwo() {
    const input = readFileSync("inputData/dayTwo.txt", {"encoding": "utf-8"}).split("\n");
    const pos : position = {x: 0, y : 0};
    let aim = 0;
    input.forEach((val, idx) => {
        const [direction, nSteps] = val.split(" ");
        if (direction === "forward") {
            pos.x += Number(nSteps);
            pos.y +=  aim * Number(nSteps);
        } else if (direction === "up") {
            aim -= Number(nSteps);
        } else if (direction === "down") {
            aim += Number(nSteps);
        }
    });

    return pos.x * pos.y;
}

const result = dayTwo()
console.log(result)