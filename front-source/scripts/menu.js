export class Menu {
  constructor(){
    this.bindUIactions()
  }

  bindUIactions(){
    const menu = document.getElementById('theMenu')
    const menuToggle = document.getElementById('menuToggle')
    const body = document.body
    const menuButton = document.getElementById('menu__button')

    menuButton.addEventListener("click", () => {
      this.removeClass(menu, "menu-open")
      this.addClass(menuToggle, "active")
    })

    menuToggle.addEventListener("click", () => {
      if (this.hasClass(menuToggle, 'active')) {
        this.addClass(menu, "menu-open")
        this.removeClass(menuToggle, "active")
      } else {
        this.addClass(menu, "menu-open")
        this.addClass(menuToggle, "active")
      }
    })
  }

  addClass(el, cls){
    el.className += ' '+cls;
  }

  removeClass(el, cls){
    var elClass = ' '+el.className+' ';
    while(elClass.indexOf(' '+cls+' ') != -1)
         elClass = elClass.replace(' '+cls+' ', '');
    el.className = elClass;
  }

  hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}
