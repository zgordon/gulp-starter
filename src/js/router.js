/**
 * Router file for managing url changes
 */

/**
 * The main router object.
 *
 */
var router = {};

/**
 * Initializes the Router
 * @returns {void}
 */
router.init = function() {

  router.loadContent();
  router.listenPageChange();

};

/**
 * Gets the slug from the URL
 *
 * @return {string} slug Slug from URL
 */
router.getSlug = function() {

  slug = window.location.hash;

  if( "" === slug ) {

    return null;

  } else {

    return slug.substr( 1 );

  }

};

/**
 * Listener function for URL changes
 * @returns {void}
 */
router.listenPageChange = function() {

  window.addEventListener( 'hashchange', router.loadContent, false );

};


/**
 * Determines whether to load blog posts
 * or single post
 *
 */

router.loadContent = function() {

  var url = router.getSlug(),
      contentObj = model.getContent( url ),
      editorEl = helpers.getEditorEl();

  view.clearContent();

  if( null === url ) {

    view.loadSingleContent( 'home' );

  } else if( 'blog' === url ) {

    view.loadBlogPosts();

  } else {

    view.loadSingleContent( url );

  }

  editor.currentContent = contentObj;
  if( false === editorEl.classList.contains( 'hidden' ) ) {

    editor.loadEditForm( editor.currentContent );

  }

};
