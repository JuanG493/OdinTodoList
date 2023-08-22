import './style.css';
// eslint-disable-next-line import/no-cycle
import { filter } from './priority.js';

// eslint-disable-next-line import/no-cycle
import {
  interfaceCheckList,
  interfaceNote,
  interfaceProyects,
  updateProjects,
} from './interfacepj';

function selector(target) {
  return document.querySelector(target);
}

const collectionToDos = {};
const allProjects = ['Odin'];
const formElm = selector('.formElm');
const btnNew = selector('.btnNew');
const btnCheckList = selector('.btnCheckL');
const btnNote = selector('.btnNote');
const btnNewProject = selector('.btnNewProject');

function flow() {
  if (localStorage.length >= 1) {
    loadPjAndToDo();
  } else {
    //  load the Odin project as the dafault
    updateProjects('Odin');
  }

  btnNew.addEventListener('click', () => {
    renewForm(formElm);
    toggleClass([btnCheckList, btnNote]);
  });

  btnCheckList.addEventListener('click', () => {
    renewForm(formElm);
    mkGeneralElements();
    interfaceCheckList();
    toggleClass([btnNote, btnCheckList]);
  });

  btnNote.addEventListener('click', () => {
    renewForm(formElm);
    mkGeneralElements();
    interfaceNote();
    toggleClass([btnNote, btnCheckList]);
  });

  btnNewProject.addEventListener('click', () => {
    renewForm(formElm);
    interfaceProyects();
  });
}
flow();

function toggleClass(elements) {
  // eslint-disable-next-line, guard-for-in, no-restricted-syntax
  for (const i in elements) {
    elements[i].classList.toggle('show');
  }
}

function renewForm(elem) {
  const content = ' ';
  elem.innerHTML = content;
}

function mkGeneralElements(vTitle = '', vData = '') {
  const dayDate = new Date().toLocaleDateString().split('/');
  formElm.innerHTML += `
    <label for='title'>Title</label>
    <input type='text' id='title' class='bsInfo inp' value='${vTitle}' required ></input>
    <label for='date'>date</label>
    <input type='date' id='date' class='bsInfo inp' 
      min='${dayDate[2]}-${dayDate[0].padStart(2, '0')}-${dayDate[1]}' 
      value='${vData}'></input>`;
}



function selectorAll(target) {
  return document.querySelectorAll(target);
}

function loadPjAndToDo() {
  const projects = [];
  for (let i = 1; i <= localStorage.length; i += 1) {
    const key = localStorage.key(i - 1);
    const valuePj = JSON.parse(localStorage.getItem(key));
    collectionToDos[key] = valuePj;

    //  prevent to add two times the same project to the sideBar
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
