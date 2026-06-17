const quizCatForm = document.getElementById("quiz-cat-form");
console.log(quizCatForm);

quizCatForm.addEventListener("submit", function(event){
    event.preventDefault();
    const data = new FormData(quizCatForm);
    const ans = {
        home: data.get("home"),
        activity: data.get("activity"),
        size: data.get("size")
    };

    if(!ans.home || !ans.activity || !ans.size){
        alert("Please answer all questions before continuing.");
        return;
    }

    localStorage.setItem("quizCatAnswers", JSON.stringify(ans));

    console.log("Saved Ans: ", ans);
    window.location.href = "cat-results.html";
});