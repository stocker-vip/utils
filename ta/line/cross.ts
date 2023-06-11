import { SUB } from ".."

// 最新有没有cross
export const Cross = (line1:number[],line2:number[])=>{
    const line = SUB(line1,line2)
    const [m,n] = line.slice(-2)
    if(m<=0 && n > 0) {
        return "U"
    }
    if(m>=0 && n<0) {
        return "D"
    }
    return "Z"
}