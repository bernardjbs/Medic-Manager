const medications = document.querySelectorAll(".medication");
const headers = document.querySelector("#table-headers")

const additionsData = async () => {
    const response = await fetch('/api/medications/additions', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        return response.json()
    } else {
        alert('Failed to retrieve data');
    }
}

const additions = []
const collectAdditions = async () => {
    const data = await additionsData()
    
    data.userMeds.forEach(result => {
        const obj = {
            meds_id: `meds${result.id}`,
            number_of_additions: result.additions.length,
            additions: []
        }
        result.additions.forEach(addition => {
            obj.additions.push({
                addition_id: addition.id,
                addition_label: addition.label,
                addition_med_id: addition.medication_id,
                addition_value: addition.value
            })
        })
        additions.push(obj)
    })
}

const createCells = async () => {
    
    await collectAdditions()

    // Collect all additions
    const allAdditions = [];
    additions.forEach(addition => addition.additions.forEach(addition => allAdditions.push(addition)))

    // Collect all unique additions
    let uniqueAdditions = [];
    additions.forEach(addition => {
        addition.additions.forEach(add => {
            if (!uniqueAdditions.includes(add.addition_label)) {
                uniqueAdditions.push(add)
            }
        })
    })

    // Load each unique addition into a 'th' element onto page
    uniqueAdditions.forEach(addition => {
        headers.innerHTML = headers.innerHTML + `<th id="${addition.addition_id}" class="addition-headers" data-medId="${addition.addition_med_id}">${addition.addition_label}</th>`;
    })

    // get all addition headers
    const additionHeadersData = document.querySelectorAll(".addition-headers");
    const additionHeaders = [];
    additionHeadersData.forEach(headerNode => additionHeaders.push(headerNode.innerHTML))

    // cycle through each med and match up the row with the addition headers
    medications.forEach(medication => {
        const medId = medication.getAttribute('id').slice(4)
        additionHeaders.forEach(header => {
            medication.innerHTML = medication.innerHTML + `<td data-med="${medId}" data-addition="${header}"></td>`
        })
    })

    // Set each addition into its respective row
    medications.forEach(medication => {
        const medId = medication.getAttribute('id').slice(4)

        allAdditions.forEach(addition => {
            if (addition.addition_med_id == medId) {
                const children = Array.from(medication.children)
                children.forEach(child => {
                    if (child.getAttribute('data-addition') === addition.addition_label) {
                        child.innerHTML = addition.addition_value
                    }
                })
            }
        })
    })

    // Add delete & update buttons
    headers.innerHTML = headers.innerHTML + `<th class="edits" style="background-color: #eaeaea; border: none;"></th><th class="edits" style="background-color: #eaeaea; border: none;"></th>`

    medications.forEach(med => {
        const medId = med.getAttribute('id').slice(4)

        med.innerHTML = med.innerHTML + `<td style="background-color: #eaeaea; background: #eaeaea; border: none;"><button id="${medId}" class="function remove">Delete Row</button></td>`;
        med.innerHTML = med.innerHTML + `<td style="background-color: #eaeaea; background: #eaeaea; border: none;"><a href="/dashboard/${medId}" class="function update">Update Row</a></td>`;
    })

    const deleteButtons = document.querySelectorAll(".remove")
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            deleteMedication(button.getAttribute('id'))
        })
    })
}

const deleteMedication = async (id) => {

    const response = await fetch(`/api/medications/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        window.location.replace('/dashboard')
    } else {
        alert('Failed to delete data');
    }

}
createCells()




/* <td id="delete{{id}}">Delete Row</td>
<td><a href="/dashboard/{{id}}">Update Row</a></td> */