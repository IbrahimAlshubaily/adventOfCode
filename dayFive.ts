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

const getGrid = () => {
    const minPoint = getPoint(lines, Math.min);
    const maxPoint = getPoint(lines, Math.max);
    const n = 1000;
    const grid : number[][] = Array(n);
    for (let i = 0; i < n; i++) {
        grid[i] = Array(1000).fill(0);
    }
    
    
    lines.forEach((line, _) => {
        const [p1, p2] = [line.p1, line.p2];

        const offset = (a:number, b: number): number => {
            let d = 0;
            if (a < b) {
                d = 1
            } else if (a > b) {
                d = -1;
            }
            return d;
        }

        const dx = offset(p1.x, p2.x)
        const dy = offset(p1.y, p2.y)
        grid[p1.x][p1.y]++;
        while (p1.x !== p2.x || p1.y !== p2.y){
            p1.x += dx;
            p1.y += dy;
            grid[p1.x][p1.y]++;
        }
    })

    let result = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] > 1){
                result++;
            }
        }
    }
    return result;


}
957201
console.log(getGrid())
