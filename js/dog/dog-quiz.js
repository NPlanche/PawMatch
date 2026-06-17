const quizForm = document.getElementById("quiz-form");
console.log(quizForm);

quizForm.addEventListener("submit", function(event){
    event.preventDefault();
    const data = new FormData(quizForm);
    const ans = {
        home: data.get("home"),
        activity: data.get("activity"),
        size: data.get("size")
    };

    if(!ans.home || !ans.activity || !ans.size){
        alert("Please answer all questions before continuing.");
        return;
    }

    localStorage.setItem("quizAnswers", JSON.stringify(ans));

    console.log("Saved Ans: ", ans);
    window.location.href = "../dog/dog-results.html";
});