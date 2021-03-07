import { Router } from 'express';
import jwt from '../../lib/JWTUtils';
import awaitErorrHandlerFactory from '../../lib/AwaitErorrHandlerFactory'
import md5 from 'js-md5'

import UserRepository from '../repositories/UserRepository'
import PersonRepository from '../repositories/PersonRepository'
import AccountRepository from '../repositories/AccountRepository'
import Mailer from '../../lib/Nodemailer'

/* eslint-disable new-cap */
const routes = Router();
/* eslint-enable new-cap */

/**
 * GET home page
 */
routes.get('/', (req, res) => {
	res.render('index', {title: 'Dostawa | API Framework'});
});


/**
 * GET /list
 *
 * This is a sample route demonstrating a simple approach to error
 * handling and testing the global error handler.
 * You most certainly want to create different/better
 * error handlers depending on your use case.
 *

routes.get('/list', (req, res, next) => {
	const {title} = req.query;

	if (title == null || title === '') {
		return next(new Error('The "title" parameter is required'));
	}

	res.render('index', {title}); 
});
*/


/**
 * This function used for obtain acess token
 * @route POST /login
 * @group Access
 * @param { object } body.body.required
 * @returns { object } 200 - Return JSON with token access
 * @returns { Error }  401 - Invalid Login!
 */
routes.post('/login', awaitErorrHandlerFactory(async (req, res, next) => {
    let userReq = {
        email: req.body.username,
        pass: req.body.password,
        active: true
    }
    const user = await new UserRepository().list(userReq)  
    if(user.count == 1 && req.body.username === user.rows[0].email && req.body.password === user.rows[0].pass){
        const person = await new PersonRepository().get(user.rows[0].personId)
        let payload = {
            token: user.rows[0].token,
            type: 'user',
            userName: user.rows[0].email
        }
        var token = jwt.sign(payload)
        let mail = {
            to: req.body.username,
            subject: 'Alerta de segurança',
            message: '<tr> \
                        <td align="center" style="padding:0 0 15px; font:bold 24px/26px Arial, Helvetica, sans-serif; color:#000;">Olá, ' + person.name.split(' ')[0] + '!</td> \
                    </tr> \
                    <tr> \
                        <td class="p-30" style="padding:0 0 43px; font:14px/25px Arial, Helvetica, sans-serif; color:#000;"> \
                            Registramos um novo acesso ao ' + process.env.APP_NAME + ' em ' + new Date().toLocaleString() + ' utilizando suas credenciais. \
                        </td> \
                    </tr>'
        }
        new Mailer().sendMail(mail, 'info')
        res.status(200).send({ auth: true, token: token });
    } else {
        res.status(401).send({ auth: false, message: 'Invalid Login!' })
    }    
}))

routes.post('/decode', awaitErorrHandlerFactory(async (req, res, next) => {
    res.status(200).send(jwt.decode(req.body.token));
}))

/**
 * This function used for create account in first access
 * @route POST /createAcccount
 * @group Access
 * @param { object } body.body.required
 * @returns { object } 200 - Return JSON with token access
 * @returns { Error }  401 - Invalid Login!
 */

routes.post('/createAccount', awaitErorrHandlerFactory(async (req, res, next) => {    
    try {
        // Create Person
        let personReq = {
            name: req.body.name,
            genre: req.body.genre   
        }
        
        await new PersonRepository().create(personReq)
        .then(async (person) => {
            // Create User
            let userReq = {
                email: req.body.email,
                pass: req.body.pass,
                token: md5(req.body.email+'-'+req.body.pass),
                active:  false,
                personId: person.id,
                profileId: 1
            }        
            
            await new UserRepository().create(userReq)
            .then(async (user) => {
                // Create Account
                let accountReq = {
                    userId: user.id,
                    planId: req.body.plan_id,
                    token: md5(user.id+'-'+req.body.plan_id),
                    active: true
                }

                await new AccountRepository().create(accountReq)
                .then(async (account) => {
            
                    let linkActive = ''
                    if(process.env.NODE_ENV == 'development') {
                        linkActive = 'http://localhost:8080/#/active/' + user.token
                    } else {
                        linkActive = 'https://app.well.eti.br/#/active/' + user.token
                    }
                    
                    let mail = {
                        to: userReq.email,
                        subject: '<CUSTOM_MESSAGEM_SUBJECT>',
                        message: '<CUSTOM_MESSAGEM_BODY>'
                    }                    
                    new Mailer().sendMail(mail, 'info')
                    res.status(200).json(account);
                }).catch((e) => {
                    res.status(500).send({message: 'Error: ' + e})
                })
            }).catch((e) => {
                res.status(500).send({message: 'Error: ' + e})
            })
        }).catch((e) => {
            res.status(500).send({message: 'Error: ' + e})
        })
        
    } catch(e) {
         res.status(500).send({message: 'Error: ' + e})
    }    
}))

/**
 * 
 * @route POST /active
 * @group Access
 * @param { object } body.body.required
 * @returns { object } 200 - Return JSON with token access
 * @returns { Error }  401 - Invalid Login!
 */
routes.post('/active', awaitErorrHandlerFactory(async (req, res, next) => { 
    try{
        const user = await new UserRepository().list(req.body) 
        let userActive = user.rows[0]
        userActive.active = true
        await new UserRepository().update(userActive.id, {
            active: true
        }).then((userResp) => {
            let linkActive = ''
            if(process.env.NODE_ENV == 'development') {
                linkActive = 'http://localhost:8080/#/login'
            } else {
                linkActive = 'https://app.well.eti.br/#/login'
            }
            let mail = {
                to: userResp.email,
                subject: '<CUSTOM_MESSAGEM_SUBJECT>',
                message: '<CUSTOM_MESSAGEM_BODY>'
            }
            new Mailer().sendMail(mail, 'info')
            res.status(200).json({message: 'Sua conta foi ativada! Você já pode fazer login no sistema...'});
        }).catch((error) => {
            console.log(error)
            res.status(500).json({message: 'Não foi possível validar sua conta, tente novamente mais tarde!'});
        })
    } catch(e) {
         res.status(500).send({message: 'Error: ' + e})
    }  
    
}))

export default routes;

