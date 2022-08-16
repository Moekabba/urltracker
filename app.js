// declear two variable => myLead then assign it to and empty Array. inputEl ->
let myLead = [];
// save the array into localStorage using JSON
// myLead = JSON.stringify(myLead);
// myLead = JSON.parse("www.max.com");
// console.log(typeof myLead);
const inputEl = document.getElementById("input-el");

// Grab ul and store it in a varialble called ulEL
let ulEl = document.getElementById("ul-el");
// use DOM Element to grab the button then add an eventlistener to it
const inputBtn = document.getElementById("input-btn");
// delete btn ==> 1. set variable to deleteBtn and grab it by id
const deleteBtn = document.getElementById("delete-btn");

// <-----get saved leads to show on screen opon refresh--- from localStorage--ps: JSON.parse()
// ["lead1", "lead2"]
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"));
const tabBtn = document.getElementById("tab-btn");
// 1. check if leadsFromLocalStorage is truthy
if (leadsFromLocalStorage) {
  // 2. if yes, set myLead to its value and call renderLeads()
  myLead = leadsFromLocalStorage;
  renderLeads(myLead);
}
// const tab = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];

// add tabBtn event listener
tabBtn.addEventListener("click", function () {
  // get actual url of any page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLead.push(tabs[0].url);
    localStorage.setItem("myLead", JSON.stringify(myLead));
    renderLeads(myLead);
  });
});
// save url, ^

// 1. push to myLead array

// refctor renderleads adding parameter --- original renderLeads commented out on bottom
// make takes parameter leads instead of global myLead variable
function renderLeads(leads) {
  let listItem = "";

  for (let i = 0; i < leads.length; i++) {
    //   "<li><a target = '-blank' href='" +
    listItem += `<li>
      <a target = '-blank' href=' ${leads[i]}'> 
      ${leads[i]}</a>
      </li>`;
  }
  ulEl.innerHTML = listItem;
}
// delete btn ==> 2. add double click eventlistener
deleteBtn.addEventListener("dblclick", function () {
  // delete btn ==> 3. clear localStorage, myLead[] and renderLeads
  localStorage.clear();
  myLead = [];
  renderLeads(myLead);
});
inputBtn.addEventListener("click", function () {
  //   let textValue = document.getElementById("input-el").value;
  myLead.push(inputEl.value); /* push into myLead array*/
  // console.log(myLead);
  // clear input field
  inputEl.value = "";
  // save my leads [] to localStorage
  localStorage.setItem("myLead", JSON.stringify(myLead));
  // call renderLeads () function here
  renderLeads(myLead);
  // varify localStorage
  console.log(localStorage.getItem("myLead"));
});
// wrap the code in renderLeads function
// --------------------------- original renderLeads
// function renderLeads() {
//   // create a variable listItem to hold all the HTML for the list items.. assign it into an empty string
//   let listItem = "";
//   // add the item to the listItem variable instead of the ulEl.innerHTML in the loop

//   for (let i = 0; i < myLead.length; i++) {
//     // add the item to the listItem variable instead of the ulEl.innerHTML

//     //   <---render out using text content
//     // ulEl.textContent += myLead[i] + " ";
//     // <---------->
//     // add <li></li> to the ul and change textContent to innerHTML
//     /* add <a> in the <li>.. add mylead in the href*/
//     // listItem +=
//     //   "<li><a target = '-blank' href='" +
//     //   myLead[i] +
//     //   "'> " +
//     //   myLead[i] +
//     //   " </a></li>";
//     // redo using template String
//     listItem += `<li>
//     <a target = '-blank' href=' ${myLead[i]}'>
//     ${myLead[i]}</a>
//     </li>`;
//     // make href open in a new tab

//     // // <---different way of adding to ul --->
//     // const li = document.createElement("li");
//     // li.textContent += myLead[i];
//     // ulEl.append(li);
//   }
//   // render the listItem inside the unordered list uisng .innerHTML
//   ulEl.innerHTML = listItem;
// }
