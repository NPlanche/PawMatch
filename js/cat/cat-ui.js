import {getCatBreeds} from "../api.js";

const savedAns = localStorage.getItem("quizCatAnswers");
const ansDisplay = document.getElementById("ans-cat-display");
const resultsList = document.getElementById("results-cat-list");
const retake = document.getElementById("retake-cat-quiz-btn");

let ans = null;
if (!savedAns) {
    ansDisplay.textContent = "No quiz answers found. Please take the quiz first.";
} else {
    ans = JSON.parse(savedAns);
    ansDisplay.textContent = `Best matches for a cat with ${ans.activity} level of activity , ${ans.affection} level of affection, ${ans.grooming} grooming needs, ${ans.vocal} vocalization, ${ans.otherPets === "yes" ? "good with other pets" : "not necessarily good with other pets"}, and ${ans.kids === "yes" ? "good with children" : "not necessarily good with children"}.`;
}

if(ans){
getCatBreeds()
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
            </br>
            <a id="results-cat-quiz-btn" href="/PawMatch/cat/cat-breed-detail.html">View Details</a>
        `;

        const details = card.querySelector("a");

        details.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.setItem("selectedCatBreed", JSON.stringify(breed));
            window.location.href = "/PawMatch/cat/cat-breed-detail.html";
        });

        resultsList.appendChild(card);
    });
})
.catch(function (error) {
    resultsList.textContent = "Sorry, breed results could not be loaded right now.";
});
}

function getMatchScore(breed, ans){
    let score = 0;

    //Home
     if (ans.home === "apartment") {
        if (breed.adaptability >= 4) {score += 3;
        }
        if (breed.indoor === 1) {score += 2;
        }
    }
    if (ans.home === "house") {
        if (breed.adaptability >= 3) {score += 2;
        }
    }

     // activity
    if (ans.activity === "low") {
        if (breed.energy_level <= 2) {score += 4;
        }
        else if (breed.energy_level === 3) {score += 2;
        }
    }

    if (ans.activity === "medium") {
        if (breed.energy_level === 3) {score += 4;
        }
        else if (breed.energy_level === 2 || breed.energy_level === 4) {score += 2;
        }
    }

    if (ans.activity === "high") {
        if (breed.energy_level >= 4) {score += 4;
        }
    }

    // affection
    if (ans.affection === "independent") {
        if (breed.affection_level <= 2) {score += 4;
        }
        else if (breed.social_needs <= 2) {score += 2;
        }
    }

    if (ans.affection === "balanced") {
        if (breed.affection_level === 3) {score += 4;
        }
        else if (breed.affection_level === 2 || breed.affection_level === 4) {score += 2;
        }
    }

    if (ans.affection === "very-affectionate") {
        if (breed.affection_level >= 4) {score += 4;
        }
        if (breed.social_needs >= 4) {score += 1;
        }
        if (breed.lap === 1) {score += 1;
        }
    }

    // grooming
    if (ans.grooming === "low") {
        if (breed.grooming <= 2) {score += 4;
        }
        if (breed.shedding_level <= 2) {score += 1;
        }
    }

    if (ans.grooming === "medium") {
        if (breed.grooming === 3) {score += 4;
        } else if (breed.grooming === 2)
        {
            score += 2;
        }
    }

    if (ans.grooming === "high") {
        if (breed.grooming >= 4) {score += 4;
        }
    }

    // vocal
    if (ans.vocal === "quiet") {
        if (breed.vocalisation <= 2) {score += 4;
        }
    }

    if (ans.vocal === "medium") {
        if (breed.vocalisation === 3){score += 4;
        } else if (breed.vocalisation === 2 || breed.vocalisation === 4) {
            score += 2;
        }
    }

    if (ans.vocal === "chatty") {
        if (breed.vocalisation >= 4) {
            score += 4;
        }
    }

    // other pets
    if (ans.otherPets === "yes") {
        if (breed.dog_friendly >= 4) {
            score += 4;
        } else if (breed.dog_friendly === 3) {
            score += 2;
        }
    }

    // kids
    if (ans.kids === "yes") {
        if (breed.child_friendly >= 4) {
            score += 4;
        } else if (breed.child_friendly === 3) {
            score += 2;
        }
    }

    return score;
}

if(retake){
    retake.addEventListener("click", function(){
        localStorage.removeItem("quizCatAnswers");
        localStorage.removeItem("selectedCatBreed");
        window.location.href = "/PawMatch/cat/cat-quiz.html";
    })
}
