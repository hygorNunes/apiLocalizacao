import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import config from 'config';
// import MongoDB from '../lib/MongoDB'
import SequelizeDB from '../lib/SequelizeDB'
import cors from 'cors';
import jwt from '../lib/JWTUtils';
import CronJons from "./cron/index";

require('dotenv').config();

const app = express();
app.use(cors());

new CronJons();

app.use(express.static('public'));

// Connect MongoDB
// const mongoDB = new MongoDB(process.env.DATABASE_MONGO_CONNECTION_STRING)
// mongoDB.connect

// Connect DataBase with Sequelize
const sequelizeDB = new SequelizeDB(process.env.DATABASE_CONNECTION_STRING)
sequelizeDB.connect()

app.disable('x-powered-by'); // disable x-powered-by
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.set('port', config.get('app.port'));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded(
    {
        limit: '5mb',
        parameterLimit: 100000,
        extended: false,
    }
));
app.use(bodyParser.json(
    {
        limit: '5mb'
    }
));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function checkJWT(req, res, next) {
    let checkToken = jwt.check(req.headers['x-access-token'])
    if (checkToken.status === 200) {
        next()
    } else {
        return res.status(checkToken.status).send({ auth: checkToken.auth, message: checkToken.message })
    }
}

// Swagger Options
const expressSwagger = require('express-swagger-generator')(app)

let options = {
    swaggerDefinition: {
        info: {
            description: 'Dostawa API Framework',
            title: 'Dostawa | API Framework',
            version: '1.0.0',
        },
        host: 'api.well.eti.br/dostawa',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'x-access-token',
                description: "",
            }
        },
    },
    route: {
        url: process.env.BASE_PATH + '/docs',
        docs: process.env.BASE_PATH + '/api-docs.json',
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js', './models/*.js'] //Path to the API handle folder

};

expressSwagger(options)

import routes from './routes/index'
import UserRoute from './routes/UserRoute'
import ProfileRoute from './routes/ProfileRoute'

app.use(process.env.BASE_PATH, routes)
app.use(process.env.BASE_PATH + '/users', checkJWT, UserRoute)
app.use(process.env.BASE_PATH + '/profiles', checkJWT, ProfileRoute)


// catch 404 and forward to error handler 
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const server = http.createServer(app);
const port = app.get('port');

server.listen(port, () => {
    console.log(`Application listening on ${config.get('app.baseUrl')}`);
    console.log(`Environment => ${config.util.getEnv('NODE_ENV')}`);
});

export default app;
