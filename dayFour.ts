import { readFileSync } from "fs";


const parseBoard = (board: string): number[][] => {
    return board.trim().split('\n').map(row => {
        return row.trim().replace(/  +/g, ' ').split(' ').map(Number)
    });
}

const isBingo = (calledNums: number[], boards: number[][][]): number => {
    const isHit = (value : number) => calledNums.includes(value);
    for (let i = 0; i < boards.length; i++) {
        for(let j = 0; j < boards[i].length; j++) {
            if (boards[i][j].every(isHit)) {
                return i;
            }
            if (boards[i].map((value, _) => value[j]).every(isHit)){
                return i;
            }
        }
        

    }
    return -1;
}
const dayThree = (): number =>  {

    const input = readFileSync("inputData/dayFour.txt", {"encoding": "utf-8"}).split("\n\n");
    const numberStream = input[0].split(',').map(Number);
    const boards: number[][][] = Array(input.length - 1);
    for (let i = 1; i < input.length; i++) {
        boards[i-1] = parseBoard(input[i])
    }

    const calledNums : number[] = [];
    for (let i = 0; i < numberStream.length; i++) {
        calledNums.push(numberStream[i]);
        const bingoIdx = isBingo(calledNums, boards);
        if (bingoIdx > 0) {
            return numberStream[i] * boards[bingoIdx].flat().filter(v => !calledNums.includes(v)).reduce((sum, curr) => sum + curr);
        }
        
    }
    return -1;
    
}
console.log(dayThree());