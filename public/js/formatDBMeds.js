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
    
    data.forEach(result => {
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

    const numberOfAdditions = [];

    additions.forEach(addition => {
        
        // Add all additions to headers
        addition.additions.forEach(addition => {
            if (!numberOfAdditions.includes(addition.addition_label)) {
                headers.innerHTML = headers.innerHTML + `<th class="addition">${addition.addition_label}</th>`
                numberOfAdditions.push(addition.addition_label)
            }
        })

        const addedTitles = document.querySelectorAll(".addition")

        medications.forEach(medication => {
            if (addition.meds_id === medication.getAttribute('id')) {

                const matchArr = []
                addition.additions.forEach(addition => {
                    addedTitles.forEach(header => {
                        if (addition.addition_label === header.innerHTML) {
                            matchArr.push({
                                meds_id: `meds${addition.addition_med_id}`,
                                value: addition.addition_value,
                                header: header.innerHTML
                            })
                        } 
                    })
                })
        
                matchArr.forEach(match => {
                    addedTitles.forEach(title => {
                        console.log(match.header)
                        console.log(title.innerHTML)
                        if (match.header === title.innerHTML) {
                            medication.innerHTML = medication.innerHTML + `<td data-addition="${match.header}">${match.value}</td>`
                        } 
                        
                    })
                    
                })
            }
        })
    })
}

createCells()
