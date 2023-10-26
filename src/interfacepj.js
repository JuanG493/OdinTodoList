// eslint-disable-next-line import/extensions
import { MkNote, CheckList } from './base.js';
// eslint-disable-next-line import/no-cycle
import {
  selector,
  selectorAll,
  renewForm,
  formElm,
  allProjects,
  collectionToDos,
// eslint-disable-next-line import/extensions
} from './index.js';
// eslint-disable-next-line import/extensions
import { filter, displayToDoByBtn } from './priority.js';

function interfaceCheckList(listOfChMade = '') {
  formElm.innerHTML += `
  <div class='displayCheckL'>
    <h3>list</h3>
    <div id='pjDisplay'></div>
    <ul class='listOfCheckList'></ul>
    <button class='btnpls'>+</button>
    <input type='submit' id='submit' />
    <button class='close'>X</button>
</div>`;

  const btnAddList = selector('.btnpls');
  const listOfCheckList = selector('.listOfCheckList');
  const btnSubmit = selector('#submit');
  const btnClose = selector('.close');

  displayProyectSelection();

  // do the elements of the checkList one by one when an argument it´s passed to the function
  if (listOfChMade) {
    for (const [key, value] of Object.entries(listOfChMade)) {
      listOfCheckList.innerHTML += `
      <input type='text' id='${key}' class='chi inp' value='${value}'>`;
    }
  }
  btnAddList.addEventListener('click', (event) => {
    event.preventDefault();
    const idChL = selectorAll('.chi').length + 1 || 1;
    mkLiandInputNode(listOfCheckList, idChL);
  });

  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    const checklistElements = obteinValues(selectorAll('.chi'));
    mkFormatingObjToDO('check', checklistElements);
    renewForm(formElm);
  });

  btnClose.addEventListener('click', () => {
    renewForm(formElm);
  });
}

function interfaceNote(notePre = '') {
  formElm.innerHTML += `
    <div class='displayCheckL'>
      <h3>Note</h3>
      <div id='pjDisplay'></div>
      <label for='noteElm'></div>
      <input type='text' size='20' id='noteElm' value='${notePre}'></input>
      <input type='submit' id='submit' />
      <button class='close'>X</button>
    </div>`;

  const btnSubmit = selector('#submit');
  const btnClose = selector('.close');

  displayProyectSelection();

  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    const noteElment = selector('#noteElm').value;
    mkFormatingObjToDO('note', noteElment);
    renewForm(formElm);
  });

  btnClose.addEventListener('click', () => {
    renewForm(formElm);
  });
}

function mkFormatingObjToDO(indicator, valuesElment) {
  const titleDate = obteinValues(selectorAll('.bsInfo'));
  const nameObj = String(titleDate.title) || 'nn';

  let creatingTheObj;
  if (indicator === 'note') {
    creatingTheObj = new MkNote(
      nameObj,
      String(titleDate.date),
      getNameOfProject(),
      valuesElment,
    );
  } else {
    // checklist
    creatingTheObj = new CheckList(
      nameObj,
      String(titleDate.date),
      getNameOfProject(),
      valuesElment,
    );
  }
  //  coping the key and values no all the jungle -.-

  collectionToDos[nameObj] = formatObjToKeyValue(creatingTheObj);
  idPjInArray(nameObj);
  filter(collectionToDos[nameObj]);
  saveTheInfo(collectionToDos[nameObj]);
}

function getNameOfProject() {
  const listOfSelections = selector('#pjDisplay');
  return listOfSelections.children[1].value;
}

function idPjInArray(nameToserch) {
  const id = Object.keys(collectionToDos).indexOf(nameToserch);

  //  add id to the project
  const projectN = collectionToDos[nameToserch];
  projectN.id = id;
  return id;
}

function formatObjToKeyValue(obj) {
  const formatingObjet = {};
  for (const key in obj) {
    formatingObjet[key] = obj[key];
  }
  return formatingObjet;
}

function saveTheInfo(todoObj) {
  localStorage.setItem(todoObj.title, JSON.stringify(todoObj));
}

function displayProyectSelection() {
  const displayPj = selector('#pjDisplay');
  let optionsPj = '';
  for (const pj of allProjects) {
    optionsPj += `<option value='${pj}' >${pj}</option>`;
  }
  displayPj.innerHTML = `
  <label for='pj-select'>Choose a project:</label>
  <select name='projectSelect' id='pj-select'>
  ${optionsPj}
  </select>`;
}

//  function acept a nodeLIst and return those values for each node
function obteinValues(nodeListI) {
  const partialObj = {};
  [...nodeListI].map((n) => (partialObj[`${n.id}`] = [n.value]));
  return partialObj;
}

function mkLiandInputNode(father, id) {
  const newItemL = mkElement('li');
  newItemL.appendChild(mkElement('input', 'text', `chi${id}`, 'chi inp'));
  father.appendChild(newItemL);
}

function mkElement(elemnt, type = '', id = '', clasName = '') {
  const newElement = document.createElement(`${elemnt}`);
  if (type) {
    newElement.setAttribute('type', `${type}`);
  }
  if (id) {
    newElement.setAttribute('id', `${id}`);
  }
  if (clasName) {
    newElement.setAttribute('class', `${clasName}`);
  }
  return newElement;
}

function interfaceProyects() {
  formElm.innerHTML += `
  <div class='groupProjects'>
    <h3>Project</h3>
    <label for='projectName'></div>
    <input type='text' id='projectName'></input>
    <input type='submit' id='submit' />
    <button class='close'>X</button>
  </div>`;

  const btnSubmit = selector('#submit');
  const btnClose = selector('.close');

  btnClose.addEventListener('click', () => {
    renewForm(formElm);
  });

  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    const projectField = selector('#projectName');
    const projectName = projectField.value;

    allProjects.push(projectName);
    updateProjects(projectName);
    renewForm(formElm);
  });
}

//  update the side bar with projects
function updateProjects(nameOfPj) {
  const displayProjects = selector('.displayProjects');

  displayProjects.innerHTML += `
    <div>
      <a class='projectNew ${nameOfPj}'>${nameOfPj}</a>
      <button class='delProject' value='${nameOfPj}'>X</button>
    </div>`;

  //  add event listener to each new project
  const delProject = selectorAll('.delProject');
  const projectLink = selectorAll('.projectNew');

  delProject.forEach((project) => {
    project.addEventListener('click', () => {
      displayProjects.removeChild(project.parentNode);
      //  update the list of projects
      const element = allProjects.indexOf(project.value);
      allProjects.splice(element, 1);
      renewForm(formElm);
    });
  });

  projectLink.forEach((projectLink) => {
    projectLink.addEventListener('click', () => {
      displayToDoByProjects(projectLink.innerText);
    });
  });
}

function displayToDoByProjects(nameOfPj) {
  renewForm(formElm);
  //  check if collectionToDos have at least one elemmnet
  if (Object.getOwnPropertyNames(collectionToDos).length >= 1) {
    for (const to in collectionToDos) {
      if (collectionToDos[to].project === nameOfPj) {
        displayToDoByBtn(collectionToDos[to], false);
      }
    }
  }
}

export {
  interfaceCheckList, interfaceNote, interfaceProyects, updateProjects,
};
