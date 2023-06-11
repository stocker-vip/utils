import { REF, SUB } from '..';
export const MonotonicIncrease = ( data: number[] ) => SUB( data, REF( data, 1 ) ).slice( 1 ).every( it => it >= 0 )
export const MonotonicDecrease = ( data: number[] ) => SUB( data, REF( data, 1 ) ).slice( 1 ).every( it => it <= 0 )