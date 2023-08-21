// import { createNewCheckLIst } from "./base.js";
import { filter } from "./priority.js";
import { MkNote, CheckList } from "./base.js";
// import { displayPjByPj } from "./priority.js";
import { displayToDoByBtn } from "./priority.js";
// import { isSameDay } from "date-fns";
// import id from "date-fns/esm/locale/id/index.js";
// import { showToDo } from "./priority.js";

let collectionToDos = {};
let allProjects = ["Odin"];
const formElm = selector(".formElm");
const btnNew = selector(".btnNew");
const btnCheckList = selector(".btnCheckL");
const btnNote = selector(".btnNote");
const btnNewProject = selector(".btnNewProject");

function flow() {
  if (localStorage.length >= 1) {
    loadPjAndToDo();
  } else {
    //load the Odin project as the dafault
    updateProjects("Odin");
  }

  btnNew.addEventListener("click", () => {
    renewForm(formElm);
    toggleClass([btnCheckList, btnNote]);
  });

  btnCheckList.addEventListener("click", () => {
    renewForm(formElm);
    mkGeneralElements();
    interfaceCheckList();
    toggleClass([btnNote, btnCheckList]);
  });

  btnNote.addEventListener("click", () => {
    renewForm(formElm);
    mkGeneralElements();
    interfaceNote();
    toggleClass([btnNote, btnCheckList]);
  });

  btnNewProject.addEventListener("click", () => {
    renewForm(formElm);
    interfaceProyects();
  });
}

function mkGeneralElements(vTitle = "", vData = "") {
  let dayDate = new Date().toLocaleDateString().split("/");
  formElm.innerHTML += `
    <label for="title">Title</label>
    <input type="text" id="title" class="bsInfo inp" value="${vTitle}"></input>
    <label for="date">date</label>
    <input type="date" id="date" class="bsInfo inp" 
      min="${dayDate[2]}-${dayDate[0].padStart(2, "0")}-${dayDate[1]}" 
      value="${vData}"></input>
  `;
}

function toggleClass(elements) {
  for (let i in elements) {
    elements[i].classList.toggle("show");
  }
}

function mkLiandInputNode(father, id) {
  let newItemL = mkElement("li");
  newItemL.appendChild(mkElement("input", "text", `chi${id}`, "chi inp"));
  father.appendChild(newItemL);
}

function mkElement(elemnt, type = "", id = "", clasName = "") {
  let newElement = document.createElement(`${elemnt}`);
  if (type) {
    newElement.setAttribute("type", `${type}`);
  }
  if (id) {
    newElement.setAttribute("id", `${id}`);
  }
  if (clasName) {
    newElement.setAttribute("class", `${clasName}`);
  }
  return newElement;
}

function selector(target) {
  return document.querySelector(target);
}

function selectorAll(target) {
  return document.querySelectorAll(target);
}

function interfaceCheckList(listOfChMade = "") {
  formElm.innerHTML += `
  <div class="displayCheckL">
    <h3>list</h3>
    <div id='pjDisplay'></div>
    <ul class="listOfCheckList"></ul>
    <button class="btnpls">+</button>
    <input type="submit" id="submit" />
    <button class="close">X</button>
  </div>`;

  const btnAddList = selector(".btnpls");
  const listOfCheckList = selector(".listOfCheckList");
  const btnSubmit = selector("#submit");
  const btnClose = selector(".close");
  // const displayPj = selector("#pjDisplay");

  displayProyectSelection();

  // crear los elementos de la lista y desgleagrlos
  if (listOfChMade) {
    for (const [key, value] of Object.entries(listOfChMade)) {
      listOfCheckList.innerHTML += `
      <input type="text" id="${key}" class="chi inp" value="${value}">`;
    }
  }

  btnAddList.addEventListener("click", (event) => {
    event.preventDefault();
    let idChL = selectorAll(".chi").length + 1 || 1;
    mkLiandInputNode(listOfCheckList, idChL);
  });

  btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    const checklistElements = obteinValues(selectorAll(".chi"));
    mkFormatingObjToDO("check", checklistElements);
    renewForm(formElm);
  });

  btnClose.addEventListener("click", () => {
    renewForm(formElm);
  });
}

function getNameOfProject() {
  let listOfSelections = selector("#pjDisplay");
  return listOfSelections.children[1].value;
}

function displayProyectSelection() {
  const displayPj = selector("#pjDisplay");
  let optionsPj = "";
  for (let pj of allProjects) {
    optionsPj += `<option value="${pj}" >${pj}</option>`;
  }
  displayPj.innerHTML = `
  <label for="pj-select">Choose a project:</label>
  <select name="projectSelect" id="pj-select">
  ${optionsPj}
  </select>`;
}
function interfaceNote(notePre = "") {
  formElm.innerHTML += `
  <div class="displayCheckL">
    <h3>Note</h3>
    <div id='pjDisplay'></div>
    <label for='noteElm'></div>
    <input type="text" size="20" id="noteElm" value="${notePre}"></input>
    <input type="submit" id="submit" />
    <button class="close">X</button>
  </div>`;

  const btnSubmit = selector("#submit");
  const btnClose = selector(".close");

  displayProyectSelection();

  btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    const noteElment = selector("#noteElm").value;
    mkFormatingObjToDO("note", noteElment);
    renewForm(formElm);
  });

  btnClose.addEventListener("click", () => {
    renewForm(formElm);
  });
}

function mkFormatingObjToDO(indicator, valuesElment) {
  const titleDate = obteinValues(selectorAll(".bsInfo"));
  let nameObj = String(titleDate.title);

  let creatingTheObj;
  if (indicator === "note") {
    creatingTheObj = new MkNote(
      nameObj,
      String(titleDate.date),
      getNameOfProject(),
      valuesElment
    );
  } else {
    //checklist
    creatingTheObj = new CheckList(
      nameObj,
      String(titleDate.date),
      getNameOfProject(),
      valuesElment
    );
  }
  //coping the key and values no all the jungle -.-
  collectionToDos[nameObj] = formatObjToKeyValue(creatingTheObj);
  // console.log("collections: ", collectionToDos);
  // let indexElm = Object.keys(collectionToDos).indexOf(nameObj);
  idPjInArray(nameObj);
  // console.log(collectionToDos[nameObj]);
  filter(collectionToDos[nameObj]);
  saveTheInfo(collectionToDos[nameObj]);
}

function saveTheInfo(todoObj) {
  localStorage.setItem(todoObj.title, JSON.stringify(todoObj));
}

function loadPjAndToDo() {
  let projects = [];
  for (let i = 1; i <= localStorage.length; i++) {
    let key = localStorage.key(i - 1);
    let valuePj = JSON.parse(localStorage.getItem(key));
    collectionToDos[key] = valuePj;

    //prevent to add two times the same project to the sideBar
    if (!projects.includes(valuePj.project)) {
      projects.push(valuePj.project);
      updateProjects(valuePj.project);
    }
    filter(valuePj);
  }
}

function idPjInArray(nameToserch) {
  let id = Object.keys(collectionToDos).indexOf(nameToserch);
  //add id to the project
  let projectN = collectionToDos[nameToserch];
  projectN["id"] = id;
  return id;
}

function formatObjToKeyValue(obj) {
  let formatingObjet = {};
  for (let key in obj) {
    formatingObjet[key] = obj[key];
  }
  return formatingObjet;
}

//function acept a nodeLIst and return those values for each node
function obteinValues(nodeListI) {
  let partialObj = {};
  [...nodeListI].map((n) => {
    return (partialObj[`${n.id}`] = [n.value]);
  });
  return partialObj;
}

function renewForm(elem) {
  let content = " ";
  elem.innerHTML = content;
}

function interfaceProyects() {
  formElm.innerHTML += `
  <div class="groupProjects">
    <h3>Project</h3>
    <label for='projectName'></div>
    <input type="text" id="projectName"></input>
    <input type="submit" id="submit" />
    <button class="close">X</button>
  </div>`;

  const btnSubmit = selector("#submit");
  const btnClose = selector(".close");

  btnClose.addEventListener("click", () => {
    renewForm(formElm);
  });

  btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    const projectField = selector("#projectName");
    const projectName = projectField.value;

    allProjects.push(projectName);
    updateProjects(projectName);
    renewForm(formElm);
  });
}

//update the side bar with projects
function updateProjects(nameOfPj) {
  const displayProjects = selector(".displayProjects");

  displayProjects.innerHTML += `
    <div>
      <a class='projectNew ${nameOfPj}'>${nameOfPj}</a>
      <button class="delProject" value="${nameOfPj}">X</button>
    </div>`;

  //add event listener to each new project
  const delProject = selectorAll(".delProject");
  const projectLink = selectorAll(`.projectNew`);

  delProject.forEach((project) => {
    project.addEventListener("click", () => {
      displayProjects.removeChild(project.parentNode);
      //update the list of projects
      let element = allProjects.indexOf(project.value);
      allProjects.splice(element, 1);
      renewForm(formElm);
    });
  });

  projectLink.forEach((projectLink) => {
    projectLink.addEventListener("click", () => {
      displayToDoByProjects(projectLink.innerText);
    });
  });
}

function displayToDoByProjects(nameOfPj) {
  renewForm(formElm);

  //check if collectionToDos have at least one elemmnet
  if (Object.getOwnPropertyNames(collectionToDos).length >= 1) {
    for (let to in collectionToDos) {
      // console.log("to: ", collectionToDos[to], "nameOfPJ: ", nameOfPj);
      if (collectionToDos[to].project === nameOfPj) {
        displayToDoByBtn(collectionToDos[to], false);
      }
    }
  }
}

export {
  flow,
  renewForm,
  mkGeneralElements,
  interfaceCheckList,
  interfaceNote,
  collectionToDos,
};
