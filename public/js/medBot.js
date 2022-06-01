const botModal = document.querySelector('#botModal');
const botModalToggle = document.querySelector('#botModalToggle');

const query = document.querySelector("#querySubmit");
const text = document.querySelector("#botQuery");
const bodyText = document.querySelector("#botBody")

// Bot responses 
const botResponses = ["Why are you asking me this?", "Ok but did you know sunshine is bright?.. huh?", "I'm but a humble service bot. I know not.", "Beep boop", "Ok but what if we didn't do that?", "I can press buttons too!", "Stop that", "Weeeeeeeee"];
const redirectResponses = ["Dashboard... dashboard? DASHBOARD!!", "Let's go home..", "Taking you to edit your medications.", "Let's add something new.", "Going to login. Beep."];

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
    
    for (let botResponse of redirectResponses) {
        let botResArr = botResponse.split(" ")
        
        if (userquery.includes("dashboard")) {
            customBotResponse = botResArr;
        } else if (userquery.includes("login")) {
            customBotResponse = botResArr;
        } else if (userquery.includes("update")) {
            customBotResponse = botResArr;
        } else if (userquery.includes("add")) {
            customBotResponse = botResArr;
        } else if (userquery.includes("edit")) {
            customBotResponse = botResArr;
        } else if (userquery.includes("home")) {
            customBotResponse = botResArr;
        }
    }
    
    setTimeout(() => {
        if (!customBotResponse) {
            bodyText.innerHTML = bodyText.innerHTML + `<p class="botResponse"><strong>MedBot: </strong>${botResponses[randomize]} </p>`
        } else {
            bodyText.innerHTML = bodyText.innerHTML + `<p class="botResponse"><strong>MedBot: </strong>${customBotResponse.join(" ")} </p>`
            setTimeout(() => {
                // For each option on the menu, add the following relative replace
                if (customBotResponse.join(" ") === "Taking you to edit your medications." || customBotResponse.join(" ") === "Dashboard... dashboard? DASHBOARD!!") {
                    window.location.replace('/dashboard')
                } else if (customBotResponse.join(" ") === "Let's go home..") {
                    window.location.replace('/')
                } else if (customBotResponse.join(" ") === "Let's add something new.") {
                    window.location.replace('/medication')
                } else if (customBotResponse.join(" ") === "Going to login. Beep.") {
                    window.location.replace('/login')
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

