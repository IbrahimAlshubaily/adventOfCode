import { readFileSync } from "fs";

interface point {
    x: number,
    y: number,
}

interface line {
    p1: point,
    p2: point
}


const parseInput = () => {
    const input = readFileSync("inputData/dayFive.txt", {"encoding": "utf-8"}).split("\n");
    const parsePoint = (pointStr: string) : point => {
        const point_xy = pointStr.split(',').map(Number);
        return  {x:point_xy[0], y:point_xy[1]}
    }
    
    const out : line[] = []
    input.forEach((val, _) => {
        const [from, to] : string[] = val.split("->");
        out.push({
            p1: parsePoint(from),
            p2: parsePoint(to)
        })
    });
    return out;
}

const lines = parseInput()




const count = (p : point) : number => {
    let out = 0;
    for (let i  = 0; i < lines.length; i++){
        const val: line = lines[i];
        const [minX, maxX] = [Math.min(val.p1.x, val.p2.x), Math.max(val.p1.x, val.p2.x)];
        const [minY, maxY] = [Math.min(val.p1.y, val.p2.y), Math.max(val.p1.y, val.p2.y)];
        
        if (p.x === val.p1.x && p.x === val.p2.x && p.y >= minY && p.y <= maxY ) {
            out+=1
        } else if (p.y === val.p1.y && p.y === val.p2.y && p.x >= minX && p.x <= maxX ) {
            out+=1
        }
        
        if (out > 2) return out;
    }
    out > 0 ? console.log(out): null
    return out;
}

const getPoint = (lines: line[], proc: Function): point =>  {
    let [minX, minY] = proc === Math.min ? [1e+9, 1e+9] : [-1, -1];
    lines.forEach((val, _) => {
        minX = proc(minX, val.p1.x, val.p2.x);
        minY = proc(minY, val.p1.y, val.p2.y);
    })
    return {x: minX, y: minY};
}

let result = 0;

const minPoint = getPoint(lines, Math.min);
const maxPoint = getPoint(lines, Math.max);
for (let x = minPoint.x; x < maxPoint.x; x++) {
    for (let y = minPoint.y; y < maxPoint.y; y++) {
        const numLines = count({x ,y})
        if (numLines > 1) {
            console.log(numLines, '---')
            result++;
        }
    }
}
console.log(result)
