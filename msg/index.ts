import {codeWithNumber} from '../format/index.ts'
export type NewsData = {
    time:string;
    code:string;
    name:string;
    title:string;
    description:string;
}

export const SendTextMsg = ( msg: string, bot:string ) =>
{
    const msgText = {
        "msgtype": "text",
        "text": {
            "content": msg,
        }
    }
    fetch( bot, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( msgText ),
        method: "POST"
    } )
}

export const SendMDMsg = ( msg: string, bot:string ) => {
    const msgText = {
        "msgtype": "markdown",
        "markdown": {
            "content": msg,
        }
    }
    fetch( bot, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( msgText ),
        method: "POST"
    } )
}

export const SendNewsMsg = ( data:NewsData, bot: string  ) =>
{
    const { code, name, title, description,time } = data;
    const msgText = {
        "msgtype": "news",
        "news": {
            "articles": [
                {
                    "title": `${ name } - ${ title }`,
                    "description": `${ time } - ${ description }`,
                    "url": `https://wap.eastmoney.com/quote/stock/${ codeWithNumber( code ) }.html`,
                    "picurl": `http://webquotepic.eastmoney.com/GetPic.aspx?nid=${ codeWithNumber( code ) }&imageType=r&_t=${ Date.now() }`
                }
            ]
        }
    }
    fetch( bot, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( msgText ),
        method: "POST"
    } )
}