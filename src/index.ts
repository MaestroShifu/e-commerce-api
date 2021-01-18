import startApp from "./infrastructure/webserver/server";

const startServer = async () => {
    const server = await startApp();

    const closeServer = () => {
        if(server) {
            // tslint:disable-next-line: no-console
            console.log('Servidor cerrado papu :v');
            process.exit(1);
        }
    };
    // Se llama cuando se crece la lista de excepciones no controladas
    process.on('uncaughtException', closeServer);
    // Se llama cuando la aplicacion se encuentra en un estadoo indefinido
    process.on('unhandledRejection', closeServer);
    // Se llama cuando se cierra la terminal
    process.on('SIGTERM', closeServer);
};

startServer();