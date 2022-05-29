const { Medication, User } = require('../models');
const sequelize = require('sequelize');
const { format_time } = require('./helpers')

// todo: HOW TO GET USER ID FROM SESSION? 


// Set interval to check everyday
setInterval(() => {
  getExpiredMed();
}, 3600000);

const getExpiredMed = async () => {
  const today = new Date()
  // Check at Midnight
  if (today.getHours() == '21') {
    const expiredMedsData = await Medication.findAll({
      where: {
        med_exp_date: { [sequelize.Op.lt]: today },
        // TODO: add condition where user_id: { user id from session }
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
          firstName: med.user.user_first_name,
          lastName: med.user.user_last_name,
          medNames: medNames,
          expDate: format_time(med.med_exp_date) 
        }

      });

    }
    console.log(medDetails)


    const content = `Dear ${medDetails.firstName} ${medDetails.lastName}, Your medication(s) ${medDetails.medNames} has/have expired. Expiry Date: ${medDetails.expDate}Please discard them`
    // todo: Send Email Notification - content
    console.log(content);
  }
}

// Will run a check when server is loaded
getExpiredMed();