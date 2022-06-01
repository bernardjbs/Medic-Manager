const botModal = document.querySelector('#botModal');
const botModalToggle = document.querySelector('#botModalToggle');

const query = document.querySelector("#querySubmit");
const text = document.querySelector("#botQuery");
const bodyText = document.querySelector("#botBody")

// Bot responses 
const botResponses = ["Why are you asking me this?", "Ok but did you know sunshine is bright?.. huh?", "I'm but a humble service bot. I know not.", "Beep boop", "Ok but what if we didn't do that?", "I can press buttons too!", "Stop that", "Weeeeeeeee"];
const redirectResponses = ["Dashboard... dashboard? DASHBOARD!!", "Let's go home..", "Time for an update? Let's go!", "Taking you to edit your medications.", "Let's add something new.", "Going to login. Beep.", "Time to destroy!!!... the session.. performing logout."];

// Check query and response accordingly
const botResponse = (query) => {

    // Bot animations for speech
    document.querySelector("#bot").style.animation = "jiggle 1s forwards infinite";
    setTimeout(() => {
        document.querySelector("#bot").style.animation = "none";
    }, 2000)

    let customBotResponse = false;
    let userquery = query.split(" ");
    const randomize = Math.floor(Math.random() * botResponses.length);

    // For each piece of input from the user query, check each word minus any special characters.
    // If any of those words matches with some a pre defined word, then loop through the special bot responses, formatted.
    // If any of the bot responses match the user query, set it

    const findMatch = (word) => {
        redirectResponses.forEach(botsentence => {
            let splitWords = botsentence.split(" ");
            splitWords.forEach(botWord => {
                
                let formatbotWord = botWord.replace(/[^a-z]/gi, '').toLowerCase()
                if (formatbotWord === word) {
                    customBotResponse = botsentence;
                }
            })
        })
    }

    userquery.forEach(word => {
        if (word) {
            let formatWord = word.replace(/[^a-z]/gi, '').toLowerCase()

            if (formatWord === "dashboard") {
                findMatch("dashboard");
            } else if (formatWord === "login") {
                findMatch("login");
            } else if (formatWord === "update") {
                findMatch("update");
            } else if (formatWord === "edit") {
                findMatch("edit");
            } else if (formatWord === "add") {
                findMatch("add");
            } else if (formatWord === "home") {
                findMatch("home");
            } else if (formatWord === "logout") {
                findMatch("logout");
            }
        }
    })
   
    setTimeout(() => {
        if (!customBotResponse) {
            bodyText.innerHTML = bodyText.innerHTML + `<p class="botResponse"><strong>MedBot: </strong>${botResponses[randomize]} </p>`
        } else {
            bodyText.innerHTML = bodyText.innerHTML + `<p class="botResponse"><strong>MedBot: </strong>${customBotResponse} </p>`
            setTimeout( async () => {
                // For each option on the menu, add the following relative replace
                if (customBotResponse === "Taking you to edit your medications." || customBotResponse === "Dashboard... dashboard? DASHBOARD!!" || customBotResponse === "Time for updates? Let's go!") {
                    window.location.replace('/dashboard')
                } else if (customBotResponse === "Let's go home..") {
                    window.location.replace('/')
                } else if (customBotResponse === "Let's add something new.") {
                    window.location.replace('/medication')
                } else if (customBotResponse === "Going to login. Beep.") {
                    window.location.replace('/login')
                } else if (customBotResponse === "Time to destroy!!!... the session.. performing logout.") {
                    const response = await fetch('/api/users/logout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    
                    if (response.ok) {
                        document.location.replace('/');
                    } else {
                        bodyText.innerHTML = bodyText.innerHTML + `<p class="botResponse"><strong>MedBot: </strong>Sorry, you did something wrong. </p>`
                    }
                }
            }, 1500)
        }
    }, 1000);
}

// Save query from user
query.addEventListener('click', async function(e) {
    e.preventDefault();

    const userRequest = text.value;

    bodyText.innerHTML = bodyText.innerHTML + `<p class="userQuery">${userRequest}</p>`;
    botResponse(userRequest);
    

    text.value = "";
});

let botInvis = true;
const toggleMedBot = () => {
    if (botInvis) {
        botModal.style.display = 'flex';
        botInvis = false;
    } else {
        botModal.style.display = 'none';
        botInvis = true;
    }
};

botModalToggle.addEventListener('click', toggleMedBot);

