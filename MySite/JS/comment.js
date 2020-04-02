class СhangeComment {
  constructor(classElements, classElemMenu) {
    this.arrComments = document.querySelectorAll(classElements);
    this.commentsLength = this.arrComments.length;
    this.activComment = 0;
    this.idInterval = null;
    this.menuOpacity = false;
    this.classElemMenu = classElemMenu;
  }

  menuActivComment() {
    const selectorForActivElem = this.classElemMenu + " ul li";
    const menuElements = document.querySelectorAll(selectorForActivElem);

    for (let i = 0; i < this.commentsLength; i++) {
      menuElements[i].style.color = "#ffffff";
    }

    let activComment = menuElements[this.activComment];
    activComment.style.color = "#10c9c3";
  }

  nextChange(act = this.activComment + 1) {
    /* меняем счетчик */
    if (act < this.commentsLength) {
      this.activComment = act;
    } else {
      this.activComment = 0;
    }

    /* сбрасываем со всех прозрачность */
    for (let i = 0; i < this.commentsLength; i++) {
      this.arrComments[i].style.opacity = "0";
      this.arrComments[i].style.zIndex = "0";
    }

    /* делаем видимым нужный елемент */
    this.arrComments[this.activComment].style.opacity = "1";
    this.arrComments[this.activComment].style.zIndex = "1";

    // Мекняем цвет активного елемента меню
    this.menuActivComment();
  }

  stopChange() {
    clearInterval(this.idInterval);
  }

  beginChange() {
    this.nextChange();
    this.idInterval = setInterval(() => {
      this.nextChange();
    }, 4500);
  }

  startChange() {
    this.idInterval = setInterval(() => {
      this.nextChange();
    }, 4500);
  }

  nextComment() {
    if (this.menuOpacity == true) {
      document.querySelector(this.classElemMenu).style.opacity = "0";
      document.querySelector(this.classElemMenu).style.zIndex = "-1";
      this.menuOpacity = false;
    }
    this.nextChange();
  }

  lastComment() {
    if (this.activComment != 0) {
      this.activComment -= 1;
    } else {
      this.activComment = this.commentsLength - 1;
    }

    for (let i = 0; i < this.commentsLength; i++) {
      this.arrComments[i].style.opacity = "0";
      this.arrComments[i].style.zIndex = "0";
    }

    if (this.menuOpacity == true) {
      document.querySelector(this.classElemMenu).style.opacity = "0";
      document.querySelector(this.classElemMenu).style.zIndex = "-1";
      this.menuOpacity = false;
    }

    this.arrComments[this.activComment].style.opacity = "1";
    this.arrComments[this.activComment].style.zIndex = "1";

    this.menuActivComment();
  }

  menuComments() {
    if (this.menuOpacity == true) {
      document.querySelector(this.classElemMenu).style.opacity = "0";
      document.querySelector(this.classElemMenu).style.zIndex = "-1";
      this.menuOpacity = false;
    } else {
      document.querySelector(this.classElemMenu).style.opacity = "1";
      document.querySelector(this.classElemMenu).style.zIndex = "10";
      this.menuOpacity = true;
    }
  }

  menuNextChange(act) {
    if (this.menuOpacity == true) {
      document.querySelector(this.classElemMenu).style.opacity = "0";
      document.querySelector(this.classElemMenu).style.zIndex = "-1";
      this.menuOpacity = false;
    }
    this.nextChange(act);
  }
}

let Comment = new СhangeComment(".comment1", ".navComment_menu");
Comment.beginChange();

// let Project = new СhangeComment(".project_elem", ".navProject_menu");
