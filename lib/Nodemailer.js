import nodemailer from 'nodemailer'

class Nodemailer {
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: { rejectUnauthorized: false }
        })
    }

    sendMail(mail, type){
        let url = ''
        if(process.env.NODE_ENV == 'development'){
            url = 'http://localhost:3000'
        } else {
            url = 'https://app.well.eti.br'
        }
        const mailOptions = {
            from: process.env.APP_NAME + '<' + process.env.SMTP_USER + '>',
            to: mail.to,
            subject: mail.subject, 
            html: this.message(mail.message, type),
            attachments: [
                {
                    filename: 'logo.png',
                    path: url + '/images/logo.png',
                    cid: 'logo' 
                },
            ]
        };
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.error(error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
          });
    }

    message(message, type){
        return this.header() + 
            '' 
            + this.footer()
    }

    header(){
        return ''
    }

    footer(){
        return ''
    }
}

export default Nodemailer