// import cron from 'node-cron';
// import nodemailer from 'nodemailer';
// import User from '../../models/User'; // adjust path as needed
// import Transaction from '../../models/Transaction'; // for bills/expenses
// import SavingsGoal from '../../models/SavingsGoal'; // for goal progress

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or your provider
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// async function sendEmail(to: string, subject: string, text: string) {
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   });
// }

// cron.schedule('0 8 * * *', async () => {
//   // 1. Find users with upcoming bills (e.g., due in 3 days)
//   // 2. Find users with low balances (e.g., < $100)
//   // 3. Find users close to their savings goal

//   // Example: send a test email to all users
//   const users = await User.find({});
//   for (const user of users) {
//     // Add your logic for reminders here
//     await sendEmail(
//       user.email,
//       'Daily Finance Reminder',
//       'This is your daily finance reminder! (Add your custom logic here.)',
//     );
//   }
// });
