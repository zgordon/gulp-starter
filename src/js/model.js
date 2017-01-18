/**
 * Model file for working with data
 */

/**
 * Main Model Object
 *
 */
var model = {};

/**
 * Initializes the Model
 * @returns {void}
 */
model.init = function() {

  if( false === model.checkLocalStore() ) {
      model.updateLocalStore( data );
  }

};


/**
 * Get a single post or page based on the url slug
 *
 * @param {string} slug The slug for the post
 * @return {Object} contentObj Single post or page
 *
 */
model.getContent = function( slug ) {

  var contentObj = model.getPost( slug );


  // If post is not found, search pages
  if( null === contentObj ) {
    contentObj = model.getPage( slug );
  }

  // If page not found, assign 404 error
  if( null === contentObj ) {
    contentObj = {
        title: '404 Error',
        content: 'Content not found'
    };
  }

  return contentObj;

};


/**
 * Get a single post or page based on the current url
 *
 * @return {Object} contentObj Single post or page
 *
 */
model.getCurrentContent = function() {

  var slug = router.getSlug(),
      contentObj = model.getContent( slug );

  return contentObj;

};


/**
 * Gets posts from local store
 *
 * @return {Object[]} posts Array of posts
 */
model.getPosts = function() {

  var posts = model.getLocalStore().posts;
  return posts;

};

/**
 * Get a single post based on url slug
 *
 * @param {string} slug The slug for the post
 * @return {Object} post Single post
 *
 */
model.getPost = function( slug ) {

  var posts = model.getLocalStore().posts;

  // Get the post from store based on the slug
  for( i = 0, max = posts.length; i < max; i++  ) {

    if( slug === posts[i].slug ) {
      return posts[i];
    }

  }

  return null;

};

/**
 * Gets pages from local store
 *
 * @return {Object[]} pages Array of page objects
 */
model.getPages = function() {

  var pages = model.getLocalStore().pages;
  return pages;

};

/**
 * Get a single page based on url slug
 *
 * @param {string} slug The slug for the page
 * @return {Object} page  Single page object
 *
 */
model.getPage = function( slug ) {

  var pages = model.getLocalStore().pages;

  if( null === slug ) slug = 'home';

  // Get the post from store based on the slug
  for( i = 0, max = pages.length; i < max; i++  ) {

   if( slug === pages[i].slug ) {
     return pages[i];
   }

  }

  return null;

};


/**
 * Updates post or page in local store
 *
 * @param {Object} contentObj Content object to update
 * @returns {void}
 */
model.updateContent = function( contentObj ) {

  var store = model.getLocalStore(),
      date = new Date();

  if( 'post' === contentObj.type ) {
    store.posts.forEach( function( post ) {
      if( contentObj.id === post.id ) {
        post.title = contentObj.title;
        post.content = contentObj.content;
        post.modified = date.toISOString();
      }
    });
  }

  if ( 'page' === contentObj.type ) {
    store.pages.forEach( function( page ) {
      if( contentObj.id === page.id ) {
        page.title = contentObj.title;
        page.content = contentObj.content;
        page.modified = date.toISOString();
      }
    });
  }


  model.updateLocalStore( store );

};


/**
 * Updates if editor is hidden
 *
 * @param {Boolean} isHidden If editor is hidden or not
 * @returns {void}
 */
model.updateEditorHidden = function( isHidden ) {

  var store = model.getLocalStore();

  store.settings.editorHidden = isHidden;
  model.updateLocalStore( store );

};

/**
 * Gets local store setting for if editor is hidden
 *
 * @return {Boolean} hidden A boolean for if editor is hidden
 */
model.getEditorHidden = function() {

  var store = model.getLocalStore();

  return store.settings.editorHidden;

};

/**
 * Checks if local store already exists
 *
 * @return {Boolean} Boolean value for if local store already exists
 */
model.checkLocalStore = function() {

  var store = model.getLocalStore();

  if ( null === store ) {
    return false;
  } else {
    return true;
  }

};


/**
 * Gets content from local store
 *
 * @return {Object} store Native JavaScript object from local store
 */
model.getLocalStore = function() {

  var store = JSON.parse( localStorage.getItem( 'vanillaPress' ) );

  return store;

};

/**
 * Saves temporary store to local storage.
 *
 * @param {Object} store Native JavaScript object with site data
 * @returns {void}
 */
model.updateLocalStore = function( store ) {

  localStorage.setItem( 'vanillaPress', JSON.stringify( store ) );

};

/**
 * Deletes data from local storage
 * @returns {void}
 */
model.removeLocalStore = function() {

  localStorage.removeItem( 'vanillaPress' );

};
