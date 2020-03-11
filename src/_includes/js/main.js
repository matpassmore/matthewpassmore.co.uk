PASSMORE = { 

  // Global JS
  common: { 
    init: function() { 
      //application-wide code 
      
      //var mainMenu = document.querySelector('.menu');
      //// const $autoNav = $("#autoNav");
      //// const $autoNavMore = $("#autoNavMore");
      //// const $autoNavMoreList = $("#autoNavMoreList");

      //var onResize = function(e) {
      //  childNumber = 2;

      //  if (window.innerWidth >= 320) {
      //    // console.log('>=320'); 

      //    menuWidth = mainMenu.scrollWidth;
      //    visibleMenuWidth = mainMenu.offsetWidth;

      //    if (visibleMenuWidth < menuWidth) {
      //      console.log('add items to overflow'); 
      //      mainMenu
      //    } else {
      //      console.log('add items to main menu'); 
      //    }

      //    // console.log('menuWidth: ' + menuWidth);
      //  } else {
      //    // console.log('<=320'); 
      //  }

      //  //note i need to pass the event as an argument to the function
      //  width = window.innerWidth;
      //  height = window.innerHeight;

      //  // console.log('w: ' + width);
      //  // console.log('h: ' + height);
      //}

      //onResize();
      //window.addEventListener("resize", onResize);

    } 
  }, 

  // JS to be executed on archive pages
  archive: { 
    init: function() { 
      // controller-wide code 

      /**
       * Toggle post tags' navigation
       */
      var button = document.createElement('button');
      var pageHeader = document.querySelector('.c-archive__header');
      var pageHeading = document.querySelector('.c-archive__title');

      // add button attributes and content
      button.setAttribute('aria-expanded', 'false'); 
      button.setAttribute('id', 'post-filter');
      button.innerHTML = `
        <span>Tag list</span>
        <svg><use xlink:href="#icon-chevron-down"></use></svg>
      `;

      // insert button into DOM
      pageHeader.insertBefore(button, pageHeading.nextSibling);

      var menu = button.nextElementSibling; 

      // set initial (closed menu) states
      button.hidden = false;
      menu.hidden = true; 

      // toggle menu visibility
      button.addEventListener('click', function() {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded)); menu.hidden = expanded;
      }); 
    }
  } 
}; 


/**
 * DOM-based routing
 * @link https://www.viget.com/articles/extending-paul-irishs-comprehensive-dom-ready-execution/
 * @link https://www.paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
 */
UTIL = { 
  exec: function( controller, action ) { 
    var ns = PASSMORE, 
      action = ( action === undefined ) ? "init" : action; 

    if ( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ) { 
      ns[controller][action](); 
    } 
  }, 
  init: function() { 
    var body = document.body, 
      controller = body.getAttribute( "data-controller" ), 
      action = body.getAttribute( "data-action" ); 

    UTIL.exec( "common" ); 
    UTIL.exec( controller ); 
    UTIL.exec( controller, action ); 
  } 
}; 

UTIL.init();
