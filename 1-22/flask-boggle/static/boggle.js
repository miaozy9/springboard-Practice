  let score = 0;
  let submittedWords = new Set();
  $("#guess").on("submit", async function handleSubmit(evt) {
    evt.preventDefault();
    let word = $("#wordInput").val();

    if (submittedWords.has(word)) {
      $(".msg").text(`${word} has already been submitted`);
      return;
    }
    const resp = await axios.get("/check-word", { params: { word: word }});
    if (resp.data.result === "not-word") {
      $(".msg").text(`${word} is not a valid English word`);
    }
    else if (resp.data.result === "not-on-board") {
      $(".msg").text(`${word} is not a valid word on this board`);
    } else {
      appendWord(word) ;
      submittedWords.add(word);
      score += word.length;
      $(".score").text(`Current score is: ${score}`);
      $(".msg").text(`${word} added`)
    }
});
  
function appendWord(word) {
  $(".words").append($("<li>", { text: word }));
}

