export default () =>{
    return{
        environmentInstance:async()=>{

            let env:any ={};

            switch(process.env.NODE_ENV){
                case 'LOCAL': env = await import('../environments/env.local')
                    break;
                case 'PROD': env = await import('../environments/env.prod')
                    break;
                case 'QA': env = await import('../environments/env.qa')
                    break;
                case 'DEV': env = await import('../environments/env.dev')
                    break;
                default:
                    console.log('No se pudo cargar el archivo de configuracion para la Api');
                    process.exit(0);
            }

            return env.default;
        }
    }
}
