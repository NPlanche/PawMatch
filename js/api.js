const API_KEY = import.meta.env.VITE_DOG_API_KEY;

export function getBreeds() {
 return fetch("https://api.thedogapi.com/v1/breeds",{
    headers:{
        "x-api-key": API_KEY
    }

}).then(function (response) {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
});
}


export function getImage(id){
    return fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${id}&limit=1`,{
        headers:{
            "x-api-key": API_KEY
        }
    }).then(function (response) {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
});
}
