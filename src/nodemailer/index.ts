import nodemailer from 'nodemailer'
import path  from 'path'
import dotenv from 'dotenv'
import ejs from 'ejs'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let config= {
    host:"smtp.gmail.com",
    service:"gmail",
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
}

function createTransporter(config:any){
    return nodemailer.createTransport(config)
}

async function sendEmail(messageOption:any){
    let transporter = createTransporter(config)
    await transporter.verify()

    await transporter.sendMail(messageOption, (err,info)=>{
        if (err){
            console.log(err);
        }
        console.log(info)
    })
}
// let messageOptions={
//     to:process.env.EMAIL,
//     from:process.env.EMAIL,
//     subject:"testing",
//     html:'<h1> hello there</h1>'

    
// }
//sendEmail(messageOptions)\


ejs.renderFile("../../templates/register.ejs", {name:"Jane Doe"}, (err,data)=>{
  
    let messageOptions={
        to:process.env.EMAIL,
        from:process.env.EMAIL,
        cc:'',
        bcc:[],
        subject:"Testing",
        html:data
    }
    sendEmail(messageOptions)
})