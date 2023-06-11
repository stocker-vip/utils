import { SMA as DSMA, EMA as DEMA } from "npm:@debut/indicators";
export const REF = ( data: number[], n: number ): number[] =>
{
    const next = data.slice( 0, data.length - n )
    const prex = Array.from( { length: n } ).map( it => NaN )
    return [ ...prex, ...next ]
}

export const ABS = ( num: number[] ): number[] =>
{
    return num.map( Math.abs );
};

const Compare = ( fn: ( a: number, b: number ) => number ) => ( n1: number[], n2: number[] | number ) =>
{
    if ( Array.isArray( n2 ) )
    {
        return n1.map( ( it, index ) => fn( it, n2[ index ] ) )
    }
    return n1.map( ( it, index ) => fn( it, n2 ) )

}

export const MIN = Compare( ( a, b ) => Math.min( a, b ) )

export const MAX = Compare( ( a, b ) => Math.max( a, b ) )

export const SMA = ( data: number[], period: number, weight: number ) =>
{
    let sma = new DSMA( period );
    return data.map( it => sma.nextValue( Number.isNaN( it ) ? 0 : it ) ?? NaN )
}

export const EMA = ( data: number[], period: number ) =>
{
    let ema = new DEMA( period );
    return data.map( it => ema.nextValue( Number.isNaN( it ) ? 0 : it ) ?? NaN )
}

export const MA = ( data: number[], period: number ) => SMA( data, period, 1 )

const HLV = ( fn: ( a: number, b: number ) => number ) => ( arr: number[], n: number ): number[] =>
{
    const helper = ( arr: number[], n: number ): number =>
    {
        let value = arr[ 0 ];
        for ( let i = 1; i < Math.min( n, arr.length ); i++ )
        {
            value = fn( value, arr[ i ] );
        }
        return value;
    };
    return arr.map( ( it, index, arrit ) =>
    {
        if ( index < n - 1 )
        {
            return NaN
        }
        const list = arrit.slice( index + 1 - n, index + 1 )
        return helper( list, n )
    } )
}

export const HHV = HLV( ( a, b ) => Math.max( a, b ) )
export const LLV = HLV( ( a, b ) => Math.min( a, b ) )

const Calc = ( fn: ( n1: number, n2: number ) => number ) => ( a: number[], b: number[] | number ) =>
{
    if ( Array.isArray( b ) )
    {
        if ( a.length !== b.length )
        {
            return []
        }
        return a.map( ( it, index ) => fn( it, b[ index ] ) )
    }
    return a.map( it => fn( it, b ) )
}

export const SUB = Calc( ( a, b ) => a - b )

export const ADD = Calc( ( a, b ) => a + b )

export const DIV = Calc( ( a, b ) =>
{
    if ( b === 0 ) return NaN;
    return a / b
} )

export const MUL = Calc( ( a, b ) => a * b )

export function IF<T> ( condition: boolean[], x: T[] | T, y: T[] | T ): T[]
{
    const getValue = ( value: T[] | T ) => ( index: number ) =>
    {
        if ( Array.isArray( value ) )
        {
            return value[ index ]
        }
        return value
    }
    const getX = getValue( x )
    const getY = getValue( y )

    return condition.map( ( b, i ) => b ? getX( i ) : getY( i ) )

}

export function LAST ( arr: number[] ): number
{
    return arr[ arr.length - 1 ];
}

export const LAST_N = (n:number)=>(data:number[]) => data.slice(-n);

export const Comp = ( fn: ( n: number, m: number ) => boolean ) => ( a: number[], b: number[] | number ): boolean[] =>
{
    if ( Array.isArray( b ) )
    {
        return a.map( ( v, i ) => fn( v, b[ i ] ) )
    }
    return a.map( ( v ) => fn( v, b ) )
}

export const GT = Comp( ( a, b ) => a > b )
export const GTE = Comp( ( a, b ) => a >= b )
export const LT = Comp( ( a, b ) => a <= b )
export const LTE = Comp( ( a, b ) => a <= b )
export const EQ = Comp( ( a, b ) => a === b )

export const MERGE = <T, D> ( a: T[], b: D[] ): [ T, D ][] =>
{
    if ( a.length !== b.length ) return [];
    return a.map( ( it, index ) => [ it, b[ index ] ] )
}

// Line

export * as Line from './line/index.ts'