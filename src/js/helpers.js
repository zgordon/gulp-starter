/**
 * Helper file for extra helper functions
 */

/**
 * Main helper object
 */
var helpers = {};


/**
 * Creates a list item with a link inside for menus
 *
 * @param {Object} contentObj Page object to create menu item for
 * @return {Object} menuItemEl List item DOM object
 */
 helpers.createMenuItem = function( contentObj ) {

   var menuItemEl = document.createElement( 'li' );

   menuItemEl.appendChild( helpers.createLink( contentObj ) );

   return menuItemEl;

 };

/**
 * Creates link
 *
 * @param {Object} contentObj Content object to create link for
 * @return {Object} linkEl Link object
 */
helpers.createLink = function( contentObj ) {

  var linkEl = document.createElement( 'a' ),
     linkTitle = document.createTextNode( contentObj.title );

  if ( 'home' !== contentObj.slug ) {
    linkEl.href = '#' + contentObj.slug;
  } else {
    linkEl.href = '#';
  }
  linkEl.appendChild( linkTitle );

  return linkEl;

};

/**
 * Gets the main menu element
 * @return {Object} Main menu DOM object
 */
helpers.getMainMenuEl = function(){
 return document.querySelector( '#mainNav ul' );
};

/**
 * Gets page title from the DOM
 * @return {Object} Main page title DOM object
 */
helpers.getPageTitleEl = function() {

  return document.getElementById( 'pageTitle' );

};

/**
 * Get links in the view
 * @return {Object} All links in the view
 */
helpers.getLinks = function() {

  return document.querySelectorAll( 'a' );

};


/**
 * Gets page content from the DOM
 * @return {Object} Main content DOM object
 */
helpers.getPageContentEl = function() {

  return document.getElementById( 'pageContent' );

};

/**
 * Gets editor Element in the DOM
 * @return {Object} Main editor DOM object
 */
helpers.getEditorEl = function() {

  return document.getElementById( 'editor' );

};

/**
 * Gets editor toggle Element in the DOM
 * @return {Object} Main toggle element
 */
helpers.getEditorToggleEl = function() {
  return document.getElementById( 'editorToggle' );
};

/**
 * Gets editor toggle link Element in the DOM
 * @return {Object} Main toggle link
 */
helpers.getEditorToggleLink = function() {
  return document.querySelector( '#editorToggle a' );
};

/**
 * Gets editor title form element
 * @return {Object} Title form element
 */
helpers.getEditorTitleEl = function() {
  return document.getElementById( 'editTitle' );
};

/**
 * Gets editor content form element
 * @return {Object} Content form element
 */
helpers.getEditorContentEl = function() {
  return document.getElementById( 'editContent' );
};

/**
 * Gets editor form update button
 * @return {Object} Content form element
 */
helpers.getEditorUpdateBtnEl = function() {
  return document.getElementById( 'editUpdateBtn' );
};
