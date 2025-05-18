exports.send = async function( notification ){
    const { ModeType, message, userId } = notification;

    return new Promise(( resolve, reject ) => {
        setTimeout( () => {
            console.log(`[${ModeType.toUpperCase()}] to user${userId}: ${message}`);
            resolve(true);
        }, 1000);
    });
};