import { collectionToDos, interfaceCheckList, interfaceNote } from './index.js';
import { isToday } from 'date-fns';
import { renewForm } from './index.js';
import { mkGeneralElements } from './index.js';

const formElm = document.querySelector('.formElm');
const todayProjects = document.querySelector('.dtToday');
const upcommingProjects = document.querySelector('.dtUpcoming');

//  organice the Todo acording to the date
function filter(ObjTodo) {
  //  filter the ToDo according to the date and add that tempo to pj
  if (isToday(new Date(`${ObjTodo.date}`))) {
    //  add the tempo to the object
    ObjTodo['tempo'] = 'dtToday';
    mkButtonProject(ObjTodo, todayProjects);
  } else {
    ObjTodo['tempo'] = 'dtUpcoming';
    mkButtonProject(ObjTodo, upcommingProjects);
  }
}

//  add the button element of the Todo al side bar according to date
function mkButtonProject(project, elmToAppend) {
  // console.log('proyectits: ', project);

  const newBtnPj = document.createElement('button');
  newBtnPj.textContent = project.title;
  newBtnPj.setAttribute('id', `pj_${project.id}`);
  newBtnPj.addEventListener('click', () => {
    displayToDoByBtn(project, true);
  });
  elmToAppend.appendChild(newBtnPj);
}

//  show the proyect in the formElment when a proyect it´s clicked or
// when the proyect (link) is clicked
function displayToDoByBtn(projectToDo, itsAList) {
  if (itsAList) {
    renewForm(formElm);
  }

  const noteOrChlist = Object.hasOwn(projectToDo, 'note');

  formElm.innerHTML += `<div class='${projectToDo.title}${projectToDo.id} displayproyects'</div>`;

  let newProjectElment = document.querySelector(
    `.${projectToDo.title}${projectToDo.id}`
  );
  newProjectElment.innerHTML += ` 
          <div>
              <div><h3>Project:</h3>${projectToDo.project}</div>
              <div><h3>Title:</h3> ${projectToDo.title}</div>
              <div><h3>Date:</h3> ${projectToDo.date}</div>
         </div>`;
  //  verify if is a note or checkLIst
  if (noteOrChlist) {
    newProjectElment.innerHTML += `<div><h3>Nota:</h3> ${projectToDo.note}</div>`;
  } else {
    newProjectElment.innerHTML += ` <h3>List</h3>
                                        <ul>`;
    for (const [key, value] of Object.entries(projectToDo.listOfElm)) {
      //   let indexElm = Object.keys(collectionToDos).indexOf(nameObj);
      newProjectElment.innerHTML += `
              <li>
                  <input type='checkbox' class='checkBoxing' id='${key}'/>
                  <label for='${key}'>${key}: ${value}</label>
              </li>`;
    }
  }
  newProjectElment.innerHTML += `
            </ul>
            <div class='mainBtns'>
              <button id='delToDo'>Delete</button>
              <button id='modifyToDo'>modify</button>
            </div>`;

  let btnDeleteToDo = document.querySelector('#delToDo');
  let btnModifyToDo = document.querySelector('#modifyToDo');
  let checkboxing = document.querySelectorAll('.checkBoxing');

  //  delete
  btnDeleteToDo.addEventListener('click', (event) => {
    event.preventDefault();
    renewForm(formElm);
    procesingDeletion(projectToDo);
  });

  //  modify
  btnModifyToDo.addEventListener('click', () => {
    renewForm(formElm);
    mkGeneralElements(projectToDo.title, projectToDo.date);

    if (noteOrChlist) {
      interfaceNote(projectToDo.note);
    } else {
      interfaceCheckList(projectToDo.listOfElm);
    }
    procesingDeletion(projectToDo);
  });

  checkboxing.forEach((box) => {
    box.addEventListener('click', () => {
      //   alert(box.id);
      box.classList.toggle('chekeado');
    });
  });
}
//  remove the element of the DOM
function procesingDeletion(projectDel) {
  let ubicationPjSideBar = document.querySelector(`.${projectDel.tempo}`);
  let elementTodel = document.querySelector(`#pj_${projectDel.id}`);
  ubicationPjSideBar.removeChild(elementTodel);
  actualizationObj(projectDel.title);
}
//  remove the element(pj) of the list of projects
function actualizationObj(nameTodel) {
  delete collectionToDos[nameTodel];
  delInfoLocalStorage(nameTodel);
}
//  remove from localStorage
function delInfoLocalStorage(key) {
  localStorage.removeItem(key);
}
export { filter, displayToDoByBtn };
