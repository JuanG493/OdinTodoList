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

export { MkNote, CheckList };
