import {Client, ClientConfig} from 'pg';

function databaseAccess() {
    const connectionOption: ClientConfig = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        ssl: {
            rejectUnauthorized: false,
        },
        connectionTimeoutMillis: 10000,
    }

    const client = new Client(connectionOption);
    client.connect()
        .then(() => { console.log('Successfully connected to database')})
        .catch(error => {
            throw Error(`Error with client connection ${error}`);
        })
    return client;
}

export const dataAccess = databaseAccess();