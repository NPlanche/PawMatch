const savedBreed = localStorage.getItem("selectedBreed");

const breedName = document.getElementById("breed-name");
const breedDescription = document.getElementById("breed-des");
const breedImage = document.getElementById("breed-image");
const breedLifeSpan = document.getElementById("breed-lifespan");
const breedOrigin = document.getElementById("breed-origin");
const breedWeight = document.getElementById("breed-weigth");
const breedHeight = document.getElementById("breed-height");
const breedTemperament = document.getElementById("breed-temperament");

if (!savedBreed) {
    breedName.textContent = "No breed selected.";
    breedDescription.textContent = "Please go back to the results page and choose a breed.";
    breedLifeSpan.textContent = "";
    breedOrigin.textContent = "";
    breedWeight.textContent = "";
    breedHeight.textContent = "";
    breedTemperament.textContent = "";
    breedImage.src = "";
    breedImage.alt = "No breed selected";
} else {
    const breed = JSON.parse(savedBreed);
        console.log(breed);

    const id = breed.id;
    breedName.textContent = breed.name || "Unknown breed";
    breedDescription.textContent = breed.description || "No description available.";
    breedLifeSpan.textContent = breed.life_span || "Unknown";
    breedOrigin.textContent = breed.origin || "Unknown";
    breedWeight.textContent = breed.weight ? breed.weight.metric + " kg" : "Unknown";
    breedHeight.textContent = breed.height ? breed.height.metric + " cm" : "Unknown";
    breedTemperament.textContent = breed.temperament || "Not listed";

    getImage(breed.id)
    .then(function(img){
        if(img.length > 0 && img[0].url){
            breedImage.src = img[0].url;
            console.log(breedImage);
            breedImage.alt = `${breed.name || "Dog breed"} image unavailable`;
        }else{
            breedImage.src = "";
            breedImage.alt = `${breed.name || "Dog breed"} image unavailable`;
        }
    }).catch(function(error){
            console.log("Failed to load img");
            breedImage.src = "";
            breedImage.alt = `${breed.name || "Dog breed"} image unavailable`;
    });

}

