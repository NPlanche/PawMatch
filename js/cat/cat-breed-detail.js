
const savedBreed = localStorage.getItem("selectedCatBreed");

const breedName = document.getElementById("breed-name");
const breedDescription = document.getElementById("breed-des");
const breedImage = document.getElementById("breed-image");
const breedLifeSpan = document.getElementById("breed-lifespan");
const breedOrigin = document.getElementById("breed-origin");
const breedWeight = document.getElementById("breed-weigth");
const breedTemperament = document.getElementById("breed-temperament");


if (!savedBreed) {
    breedName.textContent = "No breed selected.";
    breedDescription.textContent = "Please go back to the results page and choose a breed.";
    breedLifeSpan.textContent = "";
    breedOrigin.textContent = "";
    breedWeight.textContent = "";
    breedTemperament.textContent = "";
    breedOrigin.textContent = "";
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
    breedTemperament.textContent = breed.temperament || "Not listed";
    breedImage.src = breed.image && breed.image.url ? breed.image.url : "";
    breedImage.alt = `${breed.name || "Cat breed"} image`;
}

