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