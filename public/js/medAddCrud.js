const strToDate = (string) => {
  const [day, month, year] = string.split('/');
  return new Date(+year, month -1, +day);
}

const updateMedFormHandler = async (event) => {
  event.preventDefault();

  const medEl = document.querySelector('#med_name');
  const med_name = document.querySelector('#med_name').value.trim();
  const med_price = document.querySelector('#med_price').value.trim();
  const med_type = document.querySelector('#med_type').value.trim();
  const med_date_acquired = strToDate(document.querySelector('#med_date_acquired').value.trim());
  const med_script_renewed = strToDate(document.querySelector('#med_script_renewed').value.trim());
  const med_exp_date = strToDate(document.querySelector('#med_exp_date').value.trim());
  const med_id = medEl.getAttribute('data-med-id');

  if (med_name && med_price && med_type && med_date_acquired && med_script_renewed && med_exp_date) {
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
  event.preventDefault();
  const med_name = document.querySelector('#med_name').value.trim();
  const med_price = document.querySelector('#med_price').value.trim();
  const med_type = document.querySelector('#med_type').value.trim();
  const med_date_acquired = strToDate(document.querySelector('#med_date_acquired').value.trim());
  const med_script_renewed = strToDate(document.querySelector('#med_script_renewed').value.trim());
  const med_exp_date = strToDate(document.querySelector('#med_exp_date').value.trim());

  const response = await fetch(`/api/medications`, {
    method: 'POST',
    body: JSON.stringify({
      med_name,
      med_price,
      med_type,
      med_date_acquired,
      med_script_renewed,
      med_exp_date, 
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

const updateBtn = document.querySelectorAll('.update-addition-button');
const labelValues = document.querySelectorAll(".update-addition-value");

// if length > 5, hide add addition section
alert("btn length: " + updateBtn.length)
updateBtn.forEach(function(button) {
  button.addEventListener('click', (e) => {
    e.preventDefault()

    let getValue
    Array.prototype.slice.call(labelValues).forEach(value => {
      if (value.value) {
        getValue = value.value
      }
    })
  })
})

document
.querySelector('#update-medication')
?.addEventListener('click', updateMedFormHandler);  

document 
.querySelector('#add-medication')
?.addEventListener('click', addMedFormHandler);


document
  .querySelector('#update-medication')
  ?.addEventListener('submit', updateMedFormHandler);

document
  .querySelector('#add-medication')
  ?.addEventListener('submit', addMedFormHandler);