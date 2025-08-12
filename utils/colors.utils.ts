import color from 'chalk';

export default()=>{
    return{
        
        express:color.bgHex('#202C4D').hex('#F5F3F1'),
        socketIO:color.bgHex('#15465B').hex('#00dfff'),
        mongoDB:color.bgHex('#412F20').hex('#589636'),
        nodeJS:color.bgHex('#73AB63').hex('#FFFFFF'),

        success:color.greenBright.bold,
        error:color.redBright.bold,
        danger:color.yellowBright.bold,
        info:color.blueBright.bold
    }
};