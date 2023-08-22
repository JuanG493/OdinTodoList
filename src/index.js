import "./style.css";
import { filter, displayToDoByBtn } from "./priority.js";

import {
  interfaceCheckList,
  interfaceNote,
  interfaceProyects,
  updateProjects,
} from "./interfacepj";

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
flow();

function toggleClass(elements) {
  for (let i in elements) {
    elements[i].classList.toggle("show");
  }
}

function renewForm(elem) {
  let content = " ";
  elem.innerHTML = content;
}

function mkGeneralElements(vTitle = "", vData = "") {
  let dayDate = new Date().toLocaleDateString().split("/");
  formElm.innerHTML += `
    <label for="title">Title</label>
    <input type="text" id="title" class="bsInfo inp" value="${vTitle}" required ></input>
    <label for="date">date</label>
    <input type="date" id="date" class="bsInfo inp" 
      min="${dayDate[2]}-${dayDate[0].padStart(2, "0")}-${dayDate[1]}" 
      value="${vData}"></input>`;
}

function selector(target) {
  return document.querySelector(target);
}

function selectorAll(target) {
  return document.querySelectorAll(target);
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

export {
  flow,
  renewForm,
  mkGeneralElements,
  interfaceCheckList,
  interfaceNote,
  selector,
  selectorAll,
  collectionToDos,
  allProjects,
  formElm,
};
