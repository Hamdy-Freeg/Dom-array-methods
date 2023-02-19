const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMilBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");
const deleteAll = document.getElementById("delete-all");

let data = [];

async function addUser() {
  const res = await fetch("https://randomuser.me/api");
  const personData = await res.json();
  const user = personData.results[0];

  console.log(user);

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  creatingOutputToMain(newUser);
}

function creatingOutputToMain(userObj) {
  data.push(userObj);

  updateDOM();
}

function updateDOM(passedData = data) {
  deletUsers();
  passedData.forEach((dat) => {
    const item = document.createElement("div");
    item.classList.add("person");
    item.innerHTML = `<p><strong>${dat.name}</strong></p> <p>${formatNumber(
      dat.money
    )}</p>`;
    main.append(item);
  });
}

function formatNumber(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  data = data.map((dat) => {
    return { ...dat, money: dat.money * 2 };
  });
  updateDOM();
}

function showMillionaires() {
  data = data.filter((dat) => dat.money > 1000000);

  updateDOM();
}
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}
function calcAllUsers() {
  const total = data.reduce(
    (accValue, currValue) => accValue + currValue.money,
    0
  );
  const totalBox = document.createElement("div");
  totalBox.innerHTML = `<h3>Total Wealth: <strong>${formatNumber(
    total
  )}</strong></h3>`;
  main.append(totalBox);
  console.log(total);
}
function deletUsers() {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
}
addUserBtn.addEventListener("click", addUser);
doubleBtn.addEventListener("click", doubleMoney);
showMilBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortByRichest);
calculateWealthBtn.addEventListener("click", calcAllUsers);
deleteAll.addEventListener("click", deletUsers);
