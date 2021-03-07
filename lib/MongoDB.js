// SequelizeDB
import mongoose from 'mongoose';

class MongoDB {
    constructor(host){
        this.url = host
    }

    connect(host){

        mongoose.connect(host, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useCreateIndex: true,
        });

        const db = mongoose.connection;

        db.on('connected', () => {
            console.log('Mongoose default connection is open');
        });

        db.on('error', (err) => {
            console.log(`Mongoose default connection has occured \n${err}`);
        });

        db.on('disconnected', () => {
            console.log('Mongoose default connection is disconnected');
        });

        process.on('SIGINT', () => {
            db.close(() => {
                console.log(
                    'Mongoose default connection is disconnected due to application termination'
                );
                process.exit(0);
            });
        });

    }

}

export default MongoDB