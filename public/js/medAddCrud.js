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
  const med_date_acquired = document.querySelector('#med_date_acquired').value.trim();
  const med_script_renewed = document.querySelector('#med_script_renewed').value.trim();
  const med_exp_date = document.querySelector('#med_exp_date').value.trim();
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
    window.location.replace('/dashboard')
  }
  else {
    alert("Add Failed")
  }
}


const deleteBtn = document.querySelectorAll('.delete-addition-button');

// If there are more than 5 custom information additions for medicine, hide the Add block for Additions
if (deleteBtn.length > 4) {
  document.getElementById('add-addition-section').style.visibility = "hidden";
}

deleteBtn.forEach(function (button) {
  button.addEventListener('click', async function (event) {
    const button = event.currentTarget
    const id = button.dataset.additionId
    const response = await fetch(`/api/additions/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      window.location.replace(window.location.pathname)
    } else {
      alert('Failed to delete info for medication');
    }
  });
});

const addAdditionFormHandler = async (event) => {
  event.preventDefault()
  const label = document.querySelector('#add-addition-label').value.trim();
  const value = document.querySelector('#add-addition-value').value.trim();
  const medication_id = window.location.pathname.slice(12);
  
  const response = await fetch(`/api/additions`, {
    method: 'POST',
    body: JSON.stringify({
      label,
      value,
      medication_id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    window.location.replace(window.location.pathname)
  }
  else {
    alert("Add Failed")
  }
};

const updateBtn = document.querySelectorAll('.update-addition-button');
const labelValues = document.querySelectorAll(".update-addition-value");
console.log(labelValues)
updateBtn.forEach(async function(button) {
  button.addEventListener('click', async (e) => {
    e.preventDefault()
    let newValue
    Array.prototype.slice.call(labelValues).forEach(value => {
      if (value.value) {
        newValue = value.value
      }
    })
    const value = newValue
    const medication_id = window.location.pathname.slice(12);
    const id = button.dataset.additionId
    const response = await fetch(`/api/additions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        value,
        medication_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response) {
      window.location.replace(window.location.pathname)
    } else {
      alert("Update Failed")
    }
  })
})

document
  .querySelector('#update-medication')
  ?.addEventListener('submit', updateMedFormHandler);

document
  .querySelector('#add-medication')
  ?.addEventListener('submit', addMedFormHandler);

  document
  .querySelector('.add-addition')
  ?.addEventListener('submit', addAdditionFormHandler);





















// const additionValues = document.querySelectorAll('.update-addition-button');

// // if length > 5, hide add addition section

// // alert("btn length: " + additionValues.length)

// additionValues.forEach(function(button) {
//   button.addEventListener('click', async function(event){
//     event.preventDefault();
//     console.log("hello");
//     const button = event.currentTarget
//     const id = button.dataset.additionId
//     console.log(event);
//     const value = document.querySelector('input').value

//   });
// });