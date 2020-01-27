(function() {

  /**
   * Toggle post tags' navigation
   */

  var button = document.createElement('button');
  var pageHeader = document.querySelector('.c-archive-header');
  var pageHeading = document.querySelector('.c-page-heading');

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

})();

