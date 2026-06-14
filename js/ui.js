import {getBreeds} from "./api.js";

const savedAns = localStorage.getItem("quizAnswers");
const ansDisplay = document.getElementById("ans-display");
const resultsList = document.getElementById("results-list");
const retake = document.getElementById("retake-quiz-btn");

let ans = null;
if (!savedAns) {
    ansDisplay.textContent = "No quiz answers found. Please take the quiz first.";
} else {
    ans = JSON.parse(savedAns);
    console.log("Quiz Answers:", ans);
    ansDisplay.textContent = `Best matches for a ${ans.size}, ${ans.activity} activity dog in a ${ans.home}.`;
}

if(ans){
getBreeds()
.then(function (breeds) {

    const topBreeds = breeds.map(function(breed){
        return {
            breed: breed,
            score: getMatchScore(breed,ans)
        };
    })
    .filter(function(item){
        return item.score > 0;
    })
    .sort(function(a,b){
        return b.score - a.score;
    })
    .slice(0,5);

    if(topBreeds.length ===  0){
        resultsList.innerHTML=`
        <p>No strong matches were found.</p>
        <p>Try retaking the quiz.</p>`;
        return;
    }

    topBreeds.forEach(function (item) {
        const breed = item.breed;
        const card = document.createElement("article");
        card.innerHTML = `
            <h3>${breed.name}</h3>
            <p>${breed.description || "No description available."}</p>
            <p><strong>Breed Group:</strong> ${breed.breed_group || "Unknown"}</p>
            <a href="/PawMatch/breed-detail.html">View Details</a>
        `;

        const details = card.querySelector("a");

        details.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.setItem("selectedBreed", JSON.stringify(breed));
            window.location.href = "/PawMatch/breed-detail.html";
        });

        resultsList.appendChild(card);
    });
})
.catch(function (error) {
    console.log("Failed to load breeds in ui.js:", error);
    resultsList.textContent = "Sorry, breed results could not be loaded right now.";
});
}

function getMatchScore(breed, ans){
    let score = 0;
    const weight = breed.weight && breed.weight.metric ? parseFloat(breed.weight.metric): null;
    const group = breed.breed_group ? breed.breed_group.toLowerCase() : "";
    const temperament = breed.temperament ? breed.temperament.toLowerCase(): "";

    //Size
    if(ans.size === "small"){
        if(weight !== null && weight <= 10){
            score += 3;
        }else if(weight !== null && weight <=20){
            score += 1;
        }else{
            score -= 2;
        }
    }

    if(ans.size === "medium"){
        if(weight !== null && weight > 10 && weight <= 25){
            score += 3;
        }else if(weight !==null && weight <= 35){
            score += 1;
        }else{
            score -= 2;
        }
    }

    
    if(ans.size === "large"){
        if(weight !== null && weight > 25){
            score += 3;
        }else if(weight !==null && weight > 20){
            score += 1;
        }else{
            score -= 2;
        }
    }

    //Home
    if(ans.home === "apartment"){
            if(weight !== null && weight <= 10){
            score += 3;
        }else if(weight !== null && weight <=20){
            score += 1;
        }
    }
        if(ans.home === "house"){
        if(weight !== null && weight > 20){
            score += 2;
        }else{
            score += 1;
        }
    }

    //Activity
    if(ans.activity === "low"){
        if (group === "toy" || group === "non-sporting") {
            score += 3;
        }

        if (group === "working" || group === "herding" || group === "sporting") {
            score -= 2;
        }

        if(temperament.includes("calm") || temperament.includes("gentle") ||temperament.includes("quiet") || temperament.includes("easygoing")){
            score += 2;
        }
         if (temperament.includes("active") || temperament.includes("energetic") || temperament.includes("intense")) 
        {
            score -= 1;
        }
    }

    if(ans.activity === "medium"){
        if (group === "hound" || group === "non-sporting" || group === "terrier") {
            score += 2;
        }

        if(temperament.includes("friendly") || temperament.includes("playful") || temperament.includes("smart") || temperament.includes("social") ||  temperament.includes("adaptable")){
            score += 2;
        }
    }


    if(ans.activity === "high"){
        if (group === "hound" || group === "non-sporting" || group === "terrier") {
            score += 2;
        }

    if(temperament.includes("active") || temperament.includes("energetic") || temperament.includes("alert")|| temperament.includes("intense") || temperament.includes("agile") || temperament.includes("smart") ||
        temperament.includes("athletic") || temperament.includes("protective")){
        score += 2;
    }else if(temperament.includes("calm")||temperament.includes("quiet") ){
        score -= 1;
    }
    }

    return score;
}

if(retake){
    retake.addEventListener("click", function(){
        localStorage.removeItem("quizAnswers");
        localStorage.removeItem("selectedBreed");
        window.location.href = "/PawMatch/quiz.html";
    })
}
