import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: 'inxposed@qq.com',
    pass: 'zchrthkdhbvcbbai',
  },
})
