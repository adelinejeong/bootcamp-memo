function displayMemo(memo) {
  //html에 리스트로 나타나게 하기
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos"); //디폴트로 get요청이 간다
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = ""; //ul을 초기화 해주는 것
  //jsonRes = [{id:123},content:'blahblah'}]

  //forEach는 각 요소들에 대해서 함수가 각각 적용되도록 한다
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  //fetch 만 쓰면 디폴트 값이 get이기 때문에 post를 출력할땐 밑에처럼 method, header, body등등을 써야한다
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });

  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
