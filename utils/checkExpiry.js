const { Medication, User } = require('../models');
const sequelize = require('sequelize');
const { format_time } = require('./helpers')
const nodemailer = require('./nodemailer');

// Set interval to check everyday
setInterval(() => {
  getExpiredMed();
}, 3600000);

const getExpiredMed = async () => {
  const today = new Date()
  // Check at Midnight - Set hours to '00'
  if (today.getHours() == '17') {
    const expiredMedsData = await Medication.findAll({
      where: {
        med_exp_date: { [sequelize.Op.lt]: today },
        exp_notification_sent: false
      },
      include: [{ model: User }]
    })
    const expiredMeds = expiredMedsData.map((expiredMed) => expiredMed.get({ plain: true }));
    let medDetails = {}
    if (expiredMeds.length > 0) {
      let medNamesArr = []
      expiredMeds.forEach(med => {
        medNamesArr.push(med.med_name)
        const medNames = medNamesArr.join(', ');
        medDetails = {
          email: med.user.user_email,
          firstName: med.user.user_first_name,
          lastName: med.user.user_last_name,
          medNames: medNames,
          expDate: format_time(med.med_exp_date)
        }
        const content = `Dear ${medDetails.firstName} ${medDetails.lastName}, Your medication(s) ${medDetails.medNames} has/have expired. Expiry Date: ${medDetails.expDate}. Please discard them`
        if (med.exp_notification_sent == 0) {
          nodemailer.sendMail(medDetails.email, content)
            .then(result => console.log('email is sent', result))
            .catch((error) => console.log(error.message));
        }
        console.log(content);
        Medication.update(
          { exp_notification_sent: true },
          { where: { id: med.id } }
        );
      });

    }







  }
}

// Will run a check when server is loaded
getExpiredMed();