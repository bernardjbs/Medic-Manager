const updateMedFormHandler = async (event) => {
  event.preventDefault();

  const medEl = document.querySelector('#med_name');
  const med_name = document.querySelector('#med_name').value.trim();
  const med_price = document.querySelector('#med_price').value.trim();
  const med_type = document.querySelector('#med_type').value.trim();
  const med_date_acquired = document.querySelector('#med_date_acquired').value.trim();
  const med_script_renewed = document.querySelector('#med_script_renewed').value.trim();
  const med_exp_date = document.querySelector('#med_exp_date').value.trim();
  const med_id = medEl.getAttribute('data-med-id');

  if(med_name && med_price && med_type && med_date_acquired && med_script_renewed && med_exp_date) {
    const response = await fetch(`/api/medications/${med_id}`, {
      method: 'PUT', 
      body: JSON.stringify({ 
        med_name, 
        med_price, 
        med_type, 
        med_date_acquired, 
        med_script_renewed, 
        med_exp_date
      }), 
      headers: {
        'Content-Type': 'application/json',
      },
    }); 

    if (response.ok) {
      alert("Update successful")
    }
    else {
      alert("Update Failed")
    }
  }
};

const addMedFormHandler = async (event) => {
  console.log("I AM HERE I AM HERE!!!")

  event.preventDefault();
  const med_name = document.querySelector('#med_name').value.trim();
  const med_price = document.querySelector('#med_price').value.trim();
  const med_type = document.querySelector('#med_type').value.trim();
  const med_date_acquired = document.querySelector('#med_date_acquired').value.trim();
  const med_script_renewed = document.querySelector('#med_script_renewed').value.trim();
  const med_exp_date = document.querySelector('#med_exp_date').value.trim();

  if(med_name && med_price && med_type && med_date_acquired && med_script_renewed && med_exp_date) {
    const response = await fetch(`/api/medications`, {
      method: 'POST', 
      body: JSON.stringify({ 
        med_name, 
        med_price, 
        med_type, 
        med_date_acquired, 
        med_script_renewed, 
        med_exp_date
      }), 
      headers: {
        'Content-Type': 'application/json',
      },
    }); 

    if (response.ok) {
      alert("Add successful")
    }
    else {
      alert("Add Failed")
    }
  }
};

const updateAdditionFormHandler = async (event) => {
  event.preventDefault();
  const additionValue = document.querySelector('#addition-value').value.trim();
  console.log('hello');
  console.log("Value: " + additionValue);
};

document
.querySelector('#update-medication')
?.addEventListener('click', updateMedFormHandler);  

document 
.querySelector('#add-medication')
?.addEventListener('click', addMedFormHandler);

document 
.querySelector('.update-Addition')
.addEventListener('submit', updateAdditionFormHandler);


