const nodemailer=require('nodemailer')
const sendMail=async (req,res)=>{
    const testAccount=await nodemailer.createTestAccount();


    let transporter=await nodemailer.createTransport({
        host:"smtp.ethereal.email",
        port:587,
        secure:false,
       auth: {
        user: 'angus.buckridge@ethereal.email',
        pass: 'RWc24jpjnM2XYR1sPx'
        }
    })

    const info=await transporter.sendMail({
        from:'"vino thapa"<angus.buckridge@ethereal.email>',
        to:"parthma3@gmail.com",
        subject:"hello !",
        text:"hello world"

    })

    console.log("Message sent:%s",info.messageId)
    res.json(info)
}




module.exports=sendMail