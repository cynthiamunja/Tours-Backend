import nodemailer from 'nodemailer';
import { smtpConfig } from '../config'; // Example SMTP configuration

export async function sendRegistrationEmail(email: string, userName: string) {
    try {
        let transporter = nodemailer.createTransport(smtpConfig);

        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Welcome to Our Application!',
            text: `Hello ${userName},\n\nThank you for registering with our application.`
            // You can also use HTML for the email content if needed
        };

        await transporter.sendMail(mailOptions);
        console.log(`Registration email sent to ${email}`);
    } catch (error) {
        console.error('Error sending registration email:', error);
        throw new Error('Failed to send registration email');
    }
}
export async function sendBookingEmail(email: string, userName: string) {
    try {
        let transporter = nodemailer.createTransport(smtpConfig);

        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Booking Information',
            text: `Hello ${userName},\n\nThank you for making a booking.`
            // You can also use HTML for the email content if needed
        };

        await transporter.sendMail(mailOptions);
        console.log(`booking email sent to ${email}`);
    } catch (error) {
        console.error('Error sending registration email:', error);
        throw new Error('Failed to send registration email');
    }
}

