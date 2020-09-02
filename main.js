const saveForm = document.querySelector("form");

const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");
const deleteButton = document.getElementById("deleteButton");

const name = document.getElementById("name");
const currentXP = document.getElementById("currentXP");
const totalXP = document.getElementById("totalXP");
const endDate = document.getElementById("endDate");

const messageBad = document.getElementById("message-bad");
const messageGood = document.getElementById("message-good");

// Sets event listeners for the buttons
saveForm.addEventListener("submit", (e) => preventForm(e));
updateButton.addEventListener("click", updateData);
saveButton.addEventListener("click", saveData);
loadButton.addEventListener("click", loadData);
deleteButton.addEventListener("click", deleteData);

// Stops the form from submitting automatically
function preventForm(e) {
  e.preventDefault();
}

function updateData() {
  if (!endDate.value || !currentXP.value || !totalXP.value || !name.value) {
    return alert("Please fill out all fields");
  }

  const days = getRemainingDays(endDate.value);
  const xp = getRemainingXP(currentXP.value, totalXP.value);

  if (days < 0) {
    return (messageGood.innerHTML =
      "The time limit for the battlepass has expired");
  } else if (xp < 0) {
    return (messageGood.innerHTML = "You have all the xp you need!");
  } else {
    messageGood.innerHTML = `You have ${days} days left to get ${xp}xp!<br><br> You need an average of <span class="highlight">${Math.ceil(
      xp / days
    )}xp</span> a day to complete it.`;
    console.log(days);
  }
}

function saveData() {
  const data = {
    name: name.value,
    currentXP: currentXP.value,
    totalXP: totalXP.value,
    endDate: endDate.value,
  };
  localStorage.setItem("battlepass", JSON.stringify(data));
  alert("Data has been saved!");
}

function loadData() {
  const savedBattlepass = JSON.parse(localStorage.getItem("battlepass"));
  if (!savedBattlepass) {
    return alert("There is no data saved");
  } else {
    messageBad.innerHTML = "";
    name.value = savedBattlepass.name;
    currentXP.value = savedBattlepass.currentXP;
    totalXP.value = savedBattlepass.totalXP;
    endDate.value = savedBattlepass.endDate;
  }
}

function deleteData() {
  localStorage.removeItem("battlepass");
  alert("Saved data has been deleted");
}

function getRemainingXP(current, total) {
  return total - current;
}

function getRemainingDays(date) {
  const targetDate = new Date(date);
  const todaysDate = new Date(Date.now());
  const differenceTime = targetDate.getTime() - todaysDate.getTime();
  const differenceDays = differenceTime / (1000 * 3600 * 24);
  return Math.ceil(differenceDays);
}

// Fetches data on page load
if (localStorage.getItem("battlepass")) {
  loadData();
}
