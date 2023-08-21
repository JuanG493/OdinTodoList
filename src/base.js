// import { testing } from "./flow.js";

class ToDo {
  constructor(title, date, project) {
    this.title = title;
    this.date = date;
    this.project = project;
  }
}

class CheckList extends ToDo {
  constructor(title, date, project, listOfElm) {
    super(title, date, project);
    this.listOfElm = listOfElm;
  }
}

class MkNote extends ToDo {
  constructor(title, date, project, note) {
    super(title, date, project);
    this.note = note;
  }
}

// function createNewCheckLIst(title, date, project, list) {
//   const objToDo = {};

//   objToDo.name = title;
//   objToDo.date = date;
//   objToDo.project = project;
//   objToDo.list = list;

//   return objToDo;
// }

// export { createNewCheckLIst };
export { MkNote, CheckList };
