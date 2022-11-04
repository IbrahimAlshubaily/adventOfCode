import { readFileSync } from "fs";


const median = (nums : number[]) => {
    nums.sort((a,b) => a - b);
    const mid = Math.floor(nums.length / 2);
    if (nums.length % 2 === 0){
        return Math.floor( (nums[mid - 1] + nums[mid]) / 2 )
    }
    return nums[mid];
}

const stepsCost = (n: number) => {
    return n + Math.round((n * (n-1)) / 2)
}

const solve = (input: number[]) => {
    //const pos = median(input);
    const min = input.reduce( (a,b) => a < b ? a : b);
    const max = input.reduce( (a,b) => a > b ? a : b);
    let result = 1e+9;
    for (let pos= min; pos  <= max; pos++){
        let currResult = 0;
        input.forEach((v, _) => {
            const n = Math.abs(v - pos);
            currResult += stepsCost(n)
        })
        result = Math.min(result, currResult);
    }    
    console.log(result)
}

const input = readFileSync("./inputData/daySeven.txt", {"encoding": "utf-8"}).split(",").map(Number);
solve(input);

const ex = [16,1,2,0,4,2,7,1,2,14]
solve(ex)
//100220548 -> high
//100220525 -> correct
