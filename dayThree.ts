import { readFileSync } from "fs";

function dayThree(): number { 
    const input = readFileSync("inputData/dayThree.txt", {"encoding": "utf-8"}).split("\n");
    const onesCount : number [] = Array(input[0].length).fill(0);
    input.forEach((val, _) => {
        for (let i = 0; i < val.length; i++ ) {
            onesCount[i] += Number(val.charAt(i));
        }
    });
    const gamma : number[] = Array(input[0].length).fill(0);
    const eps : number[] = Array(input[0].length).fill(0);
    for (let i = 0; i < onesCount.length; i++) {
        if (onesCount[i] >= Math.floor(input.length / 2)) {
            gamma[i] = 1;
            eps[i] = 0;
        } else {
            gamma[i] = 0;
            eps[i] = 1;
        }
    }
    return binaryToDec(gamma.reverse()) * binaryToDec(eps.reverse());
}

function binaryToDec(bits : number[]) : number {
    let out = 0;
    for (let i =0; i < bits.length; i++) {
        if (bits[i] === 1){
            out += Math.pow(2, i);
        }
    }
    return out;
}

const result = dayThree()
console.log(result)

function dayTwoPartTwo() : number {
    
    const input = readFileSync("inputData/dayThree.txt", {"encoding": "utf-8"}).split("\n");
    const oxgPredicate = (numOnes: number, numZeros : number): boolean => numOnes >= numZeros;
    const oxg = getVal(input, 0, oxgPredicate)
    
    const co2Predicate = (numOnes: number, numZeros : number): boolean => numOnes < numZeros;
    const co2 = getVal(input, 0, co2Predicate)
    return oxg * co2
}

function getVal(input : string[], currIdx : number, predicate : Function) : number {
    if (input.length === 1) {
        return parseInt(input[0], 2);
    }

    let numOnes = 0;
    input.forEach((val, _) => {
        numOnes += Number(val.charAt(currIdx));
    });

    
    const bit: string = predicate(numOnes, input.length - numOnes) ? '1' : '0';
    return getVal(input.filter(value => value.charAt(currIdx) === bit), currIdx+1, predicate);
}

console.log(dayTwoPartTwo())
