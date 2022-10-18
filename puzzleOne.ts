import { readFileSync } from "fs";


function puzzleOnePartOne() {
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

const result = puzzleOnePartOne()
console.log("part 1: ", result)


function puzzleOnePartTwo() {
    const input = readFileSync("inputData/puzzleOne.txt", {"encoding": "utf-8"}).split("\n").map(Number);

    let firstWindowSum = input[0] + input[1] + input[2];
    let secondWindowSum = input[1] + input[2] + input[3];
    let out = firstWindowSum < secondWindowSum ? 1 : 0;
    for( let i = 3; i < input.length - 1; i++) {
        
        firstWindowSum -= input[i - 3];
        firstWindowSum += input[i];

        secondWindowSum -= input[i - 2];
        secondWindowSum += input[i+1];
        if (firstWindowSum < secondWindowSum){
            out++;
        }
    }
    return out;

}
const result2 = puzzleOnePartTwo()
console.log("part 2: ", result2)