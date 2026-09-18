const quizItems = [
  {
    word: "environment",
    meaning: "環境",
    example: "We should protect the environment.",
    choices: ["環境", "経験", "発明", "文化"]
  },
  {
    word: "population",
    meaning: "人口",
    example: "The population of this city is growing.",
    choices: ["天候", "人口", "歴史", "交通"]
  },
  {
    word: "communicate",
    meaning: "伝え合う、意思疎通する",
    example: "People communicate in many languages.",
    choices: ["比較する", "伝え合う、意思疎通する", "招待する", "準備する"]
  },
  {
    word: "volunteer",
    meaning: "ボランティア、志願する",
    example: "She works as a volunteer every weekend.",
    choices: ["観光客", "ボランティア、志願する", "科学者", "司会者"]
  },
  {
    word: "experience",
    meaning: "経験",
    example: "Studying abroad was a great experience.",
    choices: ["経験", "予定", "理由", "結果"]
  },
  {
    word: "necessary",
    meaning: "必要な",
    example: "Sleep is necessary for good health.",
    choices: ["安全な", "必要な", "有名な", "静かな"]
  },
  {
    word: "improve",
    meaning: "向上させる、よくなる",
    example: "Practice will improve your English.",
    choices: ["失う", "向上させる、よくなる", "借りる", "選ぶ"]
  },
  {
    word: "technology",
    meaning: "科学技術",
    example: "Technology changes our lives.",
    choices: ["芸術", "科学技術", "農業", "文学"]
  },
  {
    word: "international",
    meaning: "国際的な",
    example: "They joined an international event.",
    choices: ["個人的な", "国際的な", "伝統的な", "自然の"]
  },
  {
    word: "respect",
    meaning: "尊敬する、尊重する",
    example: "We should respect different cultures.",
    choices: ["尊敬する、尊重する", "修理する", "説明する", "反対する"]
  },
  {
    word: "decision",
    meaning: "決定",
    example: "Making a decision is sometimes difficult.",
    choices: ["決定", "機会", "習慣", "約束"]
  },
  {
    word: "opinion",
    meaning: "意見",
    example: "Please tell me your opinion.",
    choices: ["意見", "規則", "目的", "記録"]
  },
  {
    word: "continue",
    meaning: "続ける",
    example: "I will continue studying English.",
    choices: ["続ける", "到着する", "集める", "忘れる"]
  },
  {
    word: "situation",
    meaning: "状況",
    example: "We need to understand the situation.",
    choices: ["状況", "住所", "方法", "将来"]
  },
  {
    word: "purpose",
    meaning: "目的",
    example: "What is the purpose of this meeting?",
    choices: ["目的", "人口", "理由", "景色"]
  },
  {
    word: "culture",
    meaning: "文化",
    example: "Food is an important part of culture.",
    choices: ["文化", "自然", "科学", "平和"]
  },
  {
    word: "successful",
    meaning: "成功した",
    example: "The event was successful.",
    choices: ["成功した", "危険な", "退屈な", "親切な"]
  },
  {
    word: "available",
    meaning: "利用できる、手に入る",
    example: "This book is available at the library.",
    choices: ["利用できる、手に入る", "興味深い", "十分な", "正直な"]
  },
  {
    word: "suggest",
    meaning: "提案する",
    example: "Can you suggest a good place to visit?",
    choices: ["提案する", "参加する", "許す", "修理する"]
  },
  {
    word: "responsible",
    meaning: "責任がある",
    example: "You are responsible for your actions.",
    choices: ["責任がある", "人気がある", "必要な", "静かな"]
  },
  {
    word: "consequence",
    meaning: "結果、影響",
    example: "We must consider the consequences of our actions.",
    choices: ["原因、理由", "結果、影響", "条件、制限", "目標、目的"]
  },
  {
    word: "significant",
    meaning: "重要な、かなりの",
    example: "The new policy had a significant effect on the economy.",
    choices: ["一時的な", "正確な", "重要な、かなりの", "明らかな"]
  },
  {
    word: "contribute",
    meaning: "貢献する、寄付する",
    example: "Everyone can contribute to protecting the environment.",
    choices: ["貢献する、寄付する", "競争する", "要求する", "予測する"]
  },
  {
    word: "maintain",
    meaning: "維持する",
    example: "Regular exercise helps us maintain good health.",
    choices: ["取り替える", "減少させる", "発見する", "維持する"]
  },
  {
    word: "perspective",
    meaning: "観点、見方",
    example: "Traveling abroad can give you a new perspective.",
    choices: ["証拠、根拠", "観点、見方", "利益、利点", "能力、才能"]
  },
  {
    word: "opportunity",
    meaning: "機会",
    example: "This is a good opportunity to learn English.",
    choices: ["約束", "機会", "習慣", "決定"]
  }
];

const state = {
  order: [],
  index: 0,
  score: 0,
  answered: false,
  review: []
};

const questionNumber = document.querySelector("#questionNumber");
const questionText = document.querySelector("#questionText");
const choices = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const scoreText = document.querySelector("#scoreText");
const progressBar = document.querySelector("#progressBar");
const nextButton = document.querySelector("#nextButton");
const restartButton = document.querySelector("#restartButton");
const reviewHint = document.querySelector("#reviewHint");
const reviewList = document.querySelector("#reviewList");

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function isCorrectChoice(choice, item) {
  const acceptedMeanings = item.meaning.split("、").map((meaning) => meaning.trim());
  return choice === item.meaning || acceptedMeanings.includes(choice);
}

function startQuiz() {
  state.order = shuffle(quizItems);
  state.index = 0;
  state.score = 0;
  state.answered = false;
  state.review = [];
  renderQuestion();
  renderReview();
}

function renderQuestion() {
  const item = state.order[state.index];
  const current = state.index + 1;
  state.answered = false;

  questionNumber.textContent = `Question ${current} / ${state.order.length}`;
  questionText.textContent = `「${item.word}」の意味は？`;
  feedback.textContent = "";
  feedback.className = "feedback";
  scoreText.textContent = `${state.score} / ${state.index}`;
  progressBar.style.width = `${(state.index / state.order.length) * 100}%`;
  nextButton.disabled = true;
  nextButton.textContent = current === state.order.length ? "結果を見る" : "次の問題";

  choices.replaceChildren();
  shuffle(item.choices).forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => answer(choice, button));
    choices.append(button);
  });
}

function answer(choice, selectedButton) {
  if (state.answered) {
    return;
  }

  const item = state.order[state.index];
  const isCorrect = isCorrectChoice(choice, item);
  state.answered = true;

  if (isCorrect) {
    state.score += 1;
    feedback.textContent = `正解！ 例文: ${item.example}`;
    feedback.classList.add("good");
  } else {
    feedback.textContent = `惜しい！ 正解は「${item.meaning}」です。`;
    feedback.classList.add("bad");
    state.review.push(item);
    renderReview();
  }

  [...choices.children].forEach((button) => {
    button.disabled = true;
    if (isCorrectChoice(button.textContent, item)) {
      button.classList.add("correct");
    }
  });

  if (!isCorrect) {
    selectedButton.classList.add("wrong");
  }

  scoreText.textContent = `${state.score} / ${state.index + 1}`;
  nextButton.disabled = false;
}

function renderReview() {
  reviewList.replaceChildren();
  reviewHint.textContent = state.review.length
    ? "もう一度確認したい単語です。"
    : "間違えた単語がここに表示されます。";

  state.review.forEach((item) => {
    const row = document.createElement("li");
    row.innerHTML = `<strong>${item.word} = ${item.meaning}</strong><span>${item.example}</span>`;
    reviewList.append(row);
  });
}

function finishQuiz() {
  const total = state.order.length;
  const percent = Math.round((state.score / total) * 100);

  questionNumber.textContent = "Result";
  questionText.textContent = `${total}問中 ${state.score}問正解（${percent}%）`;
  choices.replaceChildren();
  feedback.textContent = percent >= 80
    ? "すばらしい！この調子で例文ごと覚えよう。"
    : "復習リストの単語を見直して、もう一度挑戦しよう。";
  feedback.className = percent >= 80 ? "feedback good" : "feedback bad";
  progressBar.style.width = "100%";
  scoreText.textContent = `${state.score} / ${total}`;
  nextButton.disabled = true;
}

nextButton.addEventListener("click", () => {
  if (state.index + 1 >= state.order.length) {
    finishQuiz();
    return;
  }

  state.index += 1;
  renderQuestion();
});

restartButton.addEventListener("click", startQuiz);

startQuiz();
