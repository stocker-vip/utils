import { SUB } from "..";

export const Shape = (line1:number[],line2:number[])=>{
    const line = SUB(line1,line2)
    let shape = "";
    let last =0;
    for(let i=0;i<line.length;i++){
        if(line[i]>0 && last !== 1){
            shape += "U"
            last = 1
        }
        if(line[i]<0 && last !== -1){
            shape += "D"
            last = -1
        }
    }
    return shape
}