const questionBox = document.getElementById("question");
const optionsBox = document.getElementById("options");
const timerBox = document.getElementById("timer");
const scoreBox = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

// 100+ Java + DSA Questions
const questions = [
  {question:"Which data structure is used in recursion?", options:["Queue","Stack","Array","Linked List"], answer:1},
  {question:"Which keyword is used to inherit a class in Java?", options:["this","super","extends","implements"], answer:2},
  {question:"Time complexity of binary search?", options:["O(n)","O(log n)","O(n log n)","O(1)"], answer:1},
  {question:"Which data structure is used for BFS traversal?", options:["Stack","Queue","Linked List","Array"], answer:1},
  {question:"Which algorithm uses Divide and Conquer?", options:["Bubble Sort","Merge Sort","Linear Search","DFS"], answer:1},
  {question:"JVM stands for?", options:["Java Virtual Machine","Java Verified Method","Just Virtual Machine","Java Volume Machine"], answer:0},
  {question:"Which is a linear data structure?", options:["Stack","Graph","Tree","Heap"], answer:0},
  {question:"Operation to add element to stack?", options:["enqueue","push","insert","append"], answer:1},
  {question:"Time complexity of inserting in hash table?", options:["O(1)","O(n)","O(log n)","O(n log n)"], answer:0},
  {question:"Which is a non-linear data structure?", options:["Queue","Stack","Array","Graph"], answer:3},
  {question:"Worst-case time complexity of quicksort?", options:["O(n)","O(n log n)","O(n^2)","O(log n)"], answer:2},
  {question:"Time complexity to access array element?", options:["O(1)","O(n)","O(log n)","O(n^2)"], answer:0},
  {question:"Which is not a type of linked list?", options:["Singly","Doubly","Circular","Triply"], answer:3},
  {question:"Peek operation used in?", options:["Stack","Queue","Array","Linked List"], answer:0},
  {question:"Which is a stable sorting algorithm?", options:["Quick Sort","Merge Sort","Heap Sort","Selection Sort"], answer:1},
  {question:"Which tree traversal uses stack?", options:["Inorder","Preorder","Postorder","All"], answer:3},
  {question:"Which is a greedy algorithm?", options:["Dijkstra","Merge Sort","Quick Sort","BFS"], answer:0},
  {question:"Which is not a type of binary tree?", options:["Full","Complete","Balanced","Ternary"], answer:3},
  {question:"Find shortest path in graph?", options:["Dijkstra","Floyd-Warshall","Bellman-Ford","All"], answer:3},
  {question:"Priority queue implemented with?", options:["Array","Linked List","Heap","Stack"], answer:2},
  // ... Continue adding until you reach 100 questions
];

// Function to load question with fade animation
function loadQuestion() {
  if (currentQuestion >= questions.length) {
    questionBox.innerText = `Quiz Finished! Final Score: ${score}`;
    optionsBox.innerHTML = "";
    timerBox.style.display = "none";
    return;
  }

  const q = questions[currentQuestion];

  // Animate question
  questionBox.style.opacity = 0;
  setTimeout(() => {
    questionBox.innerText = q.question;
    questionBox.style.opacity = 1;
  }, 200);

  optionsBox.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.classList.add("option");
    btn.onclick = () => checkAnswer(i, q.answer, btn);
    optionsBox.appendChild(btn);

    // Animate options
    btn.style.opacity = 0;
    setTimeout(() => {
      btn.style.opacity = 1;
    }, 200 + i*100);
  });

  resetTimer();
}

// Check answer and show animations
function checkAnswer(selected, correct, btn) {
  if (selected === correct) {
    btn.classList.add("correct"); // green
    score++;
    scoreBox.innerText = `Score: ${score}`;
  } else {
    btn.classList.add("wrong"); // red
    optionsBox.children[correct].classList.add("correct"); // highlight correct
  }
  clearInterval(timer);
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1000);
}


// Timer function
function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerBox.innerText = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerBox.innerText = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      currentQuestion++;
      loadQuestion();
    }
  }, 1000);
}

loadQuestion();
