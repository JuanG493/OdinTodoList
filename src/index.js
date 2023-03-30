import { compareAsc, format } from 'date-fns'

import './style.css';





class todoList {

  constructor(title, description, date, project, priority) {
    this.title = title
    this.description = description
    this.date = date
    this.project = project
    this.priority = priority
  }

  checkList() {

  }
  note() {

  }
}




const makeListTodo = () => {

  let id = 0;
  let listTodo = {};

  function newElm() {
    listTodo[id] = new todoList(...values)


  }



}


function flow() {

  const all = document.querySelector('body');
  const BigButton = document.querySelector('.btnNew');
  const selectionCheckL = document.querySelector('.checkL');
  const selectionNote = document.querySelector('.note');
  const allListOptions = document.querySelector('.itemsTo');
  const btnClose = document.querySelector('.close');
  const formElments = document.querySelector('.formElements');
  // const displayTo = document.querySelector('#displayToDo');
  // const plusCheck = document.querySelector('#pluschek');
  const listcheck = document.querySelector('.listOfCheckL');
  const btnplus = document.querySelector('.btnpls');
  const notes = document.querySelector('.notes');
  const inputsFields = document.querySelectorAll('.inp');
  const btnSubmit = document.querySelector('#submit');




  all.addEventListener('click', (event) => {
    // let showElments = document.querySelectorAll('.show');
    // console.dir(event.target.className)
    // console.log(allListOptions.className);
    // console.log(inputsFields);
    let namecls = event.target.className == 'mainframe' || event.target.className == 'sidebar' || event.target.className == 'comands' || false;
    // console.log(namecls);
    if (namecls && allListOptions.className === 'itemsTo show') {
      // deltAppendChilds(listcheck)
      toggleClass([allListOptions])
    }
  })



  btnClose.addEventListener('click', (event) => {
    event.preventDefault()
    toggleClass([allListOptions])
  })

  BigButton.addEventListener('click', () => {
    toggleClass([selectionCheckL, selectionNote])
  })


  selectionCheckL.addEventListener('click', () => {
    // event.preventDefault();
    toggleClass([allListOptions, selectionNote, selectionCheckL, listcheck, btnplus])
    listcheck.appendChild(createNewElm())
    // listcheck.innerHTML = selecContent('checklist');
    // const btnPlus = document.createElement('button');
    // btnPlus.innerText = '+';
    // btnPlus.setAttribute('onclick', 'calle')
    // displayTo.appendChild(btnPlus);
    // displayTo.innerHTML += `<button id='pluschek'>+</button>`;


  })

  btnplus.addEventListener('click', (event) => {
    event.preventDefault();
    listcheck.appendChild(createNewElm())
    // let inputCk = makeInputElment('input', 'checkbox');
    // let inputTxt = makeInputElment('input', 'text');

    // let newItemL = makeInputElment('li')
    // newItemL.appendChild(makeInputElment('input', 'checkbox'))
    // newItemL.appendChild(makeInputElment('input', 'text'))



  })


  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault()

    let values = {}
    let id = 0

    const allelements = document.querySelectorAll('.inp');
    [...allelements].map(item => {
      console.dir(item)
      values[`form${id}`] = item.value
      id +=1


    })

    console.log(values);
  })



  // const submitBtn = document.querySelector('#submit');

  // submitBtn.addEventListener('click', function(event) {
  //   event.preventDefault(); // prevent the form from submitting to the server

  //   const formEl = document.querySelector('.formElments'); // get the reference to the form
  //   const formData = new FormData(formEl);
  //   const formObject = Object.fromEntries(formData.entries());

  //   console.log(formObject);
  // });




  // displayTo.addEventListener('click', (event) => {
  //   if (event.target.id === 'pluschek') {
  //     event.preventDefault();
  //     const listOfCheckItems = document.querySelector('.listOfCheckL')
  //     console.log(listOfCheckItems.value);
  //     listOfCheckItems.innerHTML += `
  //                               <li>
  //                                 <input type="checkbox">
  //                                 <input type="text"> 
  //                               </li>`
  //   }
  // })

  // const selecContent = (selection) => {
  //   if (selection == 'checklist') {
  //     return `
  //               <li>
  //                 <input type="checkbox" >
  //                 <input type="text">

  //                </li>
  //              `
  //   } else {
  //     return 'sdf'
  //   }

  // }


  function toggleClass([...elements]) {
    [...elements].map(elm => elm.classList.toggle('show'))
  }


  const createNewElm = () => {

    console.dir(listcheck)
    let newItemL = makeInputElment('li')
    newItemL.appendChild(makeInputElment('input', 'checkbox'))
    newItemL.appendChild(makeInputElment('input', 'text', '', 'inp'))

    return newItemL

  }





  const makeInputElment = function (elemnt, type = '', id = '', classN = '') {
    let newElement = document.createElement(`${elemnt}`);
    if (type != '') {
      newElement.setAttribute('type', `${type}`)
    }
    if (id != '') {
      newElement.setAttribute('id', `${id}`)
    }
    if (classN != '') {
      newElement.setAttribute('class', `${classN}`)
    }

    return newElement
  }

  const deltAppendChilds = (father) => {
    father.innerHTML = '';

  }

  function resetFields() {

  }




}





flow()







