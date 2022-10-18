import { readFileSync } from "fs";


function puzzleOnePartOneSolution() {
    const input = readFileSync("inputData/puzzleOne.txt", {"encoding": "utf-8"}).split("\n").map(Number);
    let out = 0;
    let prev = input[0];
    for (let i = 1; i < input.length; i++) {

        if (input[i] > prev) {
            out++;
        }
        prev = input[i];
    }
    return out;
}

const result = puzzleOnePartOneSolution()
console.log("part 1: ", result)