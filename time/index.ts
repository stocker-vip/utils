import dayjs from 'npm:dayjs';

import utc from 'npm:dayjs/plugin/utc.js';
import timezone from 'npm:dayjs/plugin/timezone.js';
dayjs.extend( utc );
dayjs.extend( timezone );

dayjs.tz.setDefault( 'Asia/Shanghai' )

export const isWorkingTime = () =>
{
    if ( Deno.env.get( "DEV") ) return true;
    const now = Now().format( "HH:mm:ss" );
    if ( Now().day() < 1 || Now().day() > 5 ) return false;
    if ( now >= "09:15:00" && now <= "11:30:00" || now >= "13:00:00" && now <= "15:00:00" )
    {
        return true;
    }
    return false;
}


export const isInTime = ( time: string ) =>
{
    if ( Deno.env.get( "DEV") ) return true;
    const t = Format( time ).unix();
    const end = Format().unix();
    const start = Format().subtract( 30, 's' ).unix();
    if ( start <= t && t <= end ) return true;
    return false;

}

// 固定时区Asia/Shanghai
export const Now = () => Format();

export const Format = ( input?: string | number | Date | dayjs.Dayjs | null | undefined ) => dayjs.tz( input )