const quizCatForm = document.getElementById("quiz-cat-form");

quizCatForm.addEventListener("submit", function(event){
    event.preventDefault();
    const data = new FormData(quizCatForm);
    const ans = {
        home: data.get("home"),
        activity: data.get("activity"),
        affection: data.get("affection"),
        grooming: data.get("grooming"),
        vocal: data.get("vocal"),
        otherPets: data.get("otherPets"),
        kids: data.get("kids")
    };

    if(!ans.home || !ans.activity || !ans.affection || !ans.grooming || !ans.vocal || !ans.otherPets || !ans.kids){
        alert("Please answer all questions before continuing.");
        return;
    }

    localStorage.setItem("quizCatAnswers", JSON.stringify(ans));

    window.location.href = "cat-results.html";
});