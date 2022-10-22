import { readFileSync } from "fs";


const parseBoard = (board: string): number[][] => {
    return board.trim().split('\n').map(row => {
        return row.trim().replace(/  +/g, ' ').split(' ').map(Number)
    });
}

const isBingo = (calledNums: number[], boards: number[][][]): number[] => {
    const isHit = (value : number) => calledNums.includes(value);
    let hits: number[] = [];
    for (let i = 0; i < boards.length; i++) {
        for(let j = 0; j < boards[i].length; j++) {
            if (boards[i][j].every(isHit)) {
                hits.push(i);
            }
            if (boards[i].map((value, _) => value[j]).every(isHit)){
                hits.push(i);
            }
        }
        

    }
    return hits;
}
const dayThree = (): number =>  {

    const input = readFileSync("inputData/dayFour.txt", {"encoding": "utf-8"}).split("\n\n");
    const numberStream = input[0].split(',').map(Number);
    const boards: number[][][] = Array(input.length - 1);
    for (let i = 1; i < input.length; i++) {
        boards[i-1] = parseBoard(input[i])
    }

    const calledNums : number[] = [];
    let lastBingo = -1;
    const hits: Set<number> = new Set();
    for (let i = 0; i < numberStream.length; i++) {
        calledNums.push(numberStream[i]);
        const bingoIdx = isBingo(calledNums, boards);
        if (bingoIdx.length > 0) {
            for (let idx  = 0; idx < bingoIdx.length; idx++) {
                if (hits.has(bingoIdx[idx])) continue;
                hits.add(bingoIdx[idx]);
                const boardVal = boards[bingoIdx[idx]].flat().filter(v => !calledNums.includes(v)).reduce((sum, curr) => sum + curr);
                lastBingo = numberStream[i] * boardVal;
            }

        }
        
    }
    return lastBingo;
    
}
console.log(dayThree());