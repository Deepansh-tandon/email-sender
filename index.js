const express =require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User= require("./model/model");
const dotenv = require('dotenv');
dotenv.config()
const app=express();
app.use(express.json());
app.post('/email', async function(req, res) {
    const { email, content, password } = req.body;
    try {
        const newUser = new User({
            email,
            content,
            password
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get('/sendmail', async function(req, res) {
    const receiveraddress  = req.query.receiveraddress;
    // const user = await User.findOne();
    try {
        
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: receiveraddress,          
            subject: 'Test Email',        
            text: 'This is a test email.' 
        };

        await transporter.sendMail(mailOptions);
        
        res.send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

app.listen(3000);


