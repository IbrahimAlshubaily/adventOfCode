import { readFileSync } from "fs";



const median = (nums : number[]) => {
    nums.sort((a,b) => a - b);
    const mid = Math.floor(nums.length / 2);
    if (nums.length % 2 === 0){
        return Math.floor( (nums[mid - 1] + nums[mid]) / 2 )
    }
    return nums[mid];
}

const solve = () => {
    const input = readFileSync("./inputData/daySeven.txt", {"encoding": "utf-8"}).split(",").map(Number);
    const pos = median(input);
    let result = 0;
    input.forEach((v, _) => {
        result += Math.abs(v - pos);
    })
    console.log(result)
}
solve();