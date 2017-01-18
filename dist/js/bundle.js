
/**
 * Main JSON object of posts, pages and settings
 */
var posts =
    [
      {
        "id":1,
        "date":"2016-01-09T22:05:09",
        "modified":"2016-01-09T22:05:09",
        "slug":"hello-world",
        "type":"post",
        "title":"Hello world!",
        "content":"Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"
      },
      {
        "id":2,
        "date":"2016-01-10T22:05:09",
        "modified":"2016-01-10T22:05:09",
        "slug":"learning-javascript",
        "type":"post",
        "title":"Learning JavaScript!",
        "content":"I'm learning JavaScript and super excited!!!"
      },
      {
        "id":3,
        "date":"2016-01-11T22:05:09",
        "modified":"2016-01-11T22:05:09",
        "slug":"rest-api",
        "type":"post",
        "title":"The REST API!",
        "content":"I've started working with the REST API in WordPress, what fun!"
      },
      {
        "id":4,
        "date":"2016-01-12T22:05:09",
        "modified":"2016-01-12T22:05:09",
        "slug":"json-data",
        "type":"post",
        "title":"JSON Data!",
        "content":"So, with the REST API it is posible to pull in WordPress data as pure JSON.  Now I'm figuring out what to do with the data"
      },
      {
        "id":5,
        "date":"2016-01-13T22:05:09",
        "modified":"2016-01-13T22:05:09",
        "slug":"javascript-project",
        "type":"post",
        "title":"JavaScript Project",
        "content":"I've started working with the REST API in WordPress, what fun!"
      }
    ],
    pages =
    [
      {
        "id":6,
        "date":"2016-01-18T22:05:09",
        "modified":"2016-01-18T22:05:09",
        "slug":"home",
        "type":"page",
        "title":"Home",
        "content":"Welcome to VanillaPress, my JavaScript site!"
      },
      {
        "id":7,
        "date":"2016-01-18T22:05:09",
        "modified":"2016-01-18T22:05:09",
        "slug":"about",
        "type":"page",
        "title":"About",
        "content":"A little about me!"
      },
      {
        "id":8,
        "date":"2016-01-18T22:05:09",
        "modified":"2016-01-18T22:05:09",
        "slug":"blog",
        "type":"page",
        "title":"Blog",
        "content":"Please enjoy my posts"
      },
      {
        "id":9,
        "date":"2016-01-18T22:05:09",
        "modified":"2016-01-18T22:05:09",
        "slug":"contact",
        "type":"page",
        "title":"Contact",
        "content":"Drop me a line with any questions :)"
      }
    ],
    settings = {
      "editorHidden":"true"
    },
    data = {
      "posts": posts,
      "pages": pages,
      "settings": settings
    };

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

/**
 * View file for displaying content
 */


/**
 * Main view object
 * @returns {void}
 */
var view = {};


/**
 * Calls initial View methods
 * @returns {void}
 */
view.init = function() {

  view.createMainMenu();

};


/**
 * Gets blog posts and appends them to the page
 * @returns {void}
 */
view.loadBlogPosts = function() {

  var posts = model.getPosts(),
      postsMarkup = document.createDocumentFragment(),
      titleEl = helpers.getPageTitleEl(),
      contentEl = helpers.getPageContentEl(),
	 i,
	 max;


  for ( i = 0, max = posts.length; i < max; i++ ) {
    postsMarkup.appendChild( view.createPostMarkup( posts[i] ) );
  }

  contentEl.appendChild( postsMarkup );
  titleEl.innerHTML = 'Blog Posts';

};


/**
 * Displays a single post or page based on URL
 * @param {String} slug The url slug of the post or page
 * @returns {void}
 */
 view.loadSingleContent = function( slug ) {

   var contentObj = model.getContent( slug ),
       titleEl = helpers.getPageTitleEl(),
       contentEl = helpers.getPageContentEl();


   titleEl.innerHTML = contentObj.title;
   contentEl.innerHTML = contentObj.content;

 };


/**
* Updates the main title and content for a page or post
* @param {Object} contentObj The post or page object
* @returns {void}
*/
view.updateTitleAndContent = function( contentObj ) {

  view.updateTitle( contentObj.title );
  view.updateContent( contentObj.content );

};

/**
* Updates the main title for a page or post
* @param {String} title The title for a post or page
* @returns {void}
*/
view.updateTitle = function( title ) {

  var titleEl = helpers.getPageTitleEl();

  titleEl.innerHTML = title;

};


/**
* Updates the main content for a page or post
* @param {String} content The content for a post or page
* @returns {void}
*/
view.updateContent = function( content ) {

  var contentEl = helpers.getPageContentEl();

  contentEl.innerHTML = content;

};


/**
 * Clears the page title and content from the page
 * @returns {void}
 */
view.clearContent = function() {
  var titleEl = helpers.getPageTitleEl(),
      contentEl = helpers.getPageContentEl();

  titleEl.innerHTML = '';
  contentEl.innerHTML = '';
};


/**
 * Creates Main Menu Links for Pages
 * @returns {void}
 */
 view.createMainMenu = function() {

   var pages = model.getPages(),
       menuMarkup = document.createDocumentFragment(),
       mainMenuEl = helpers.getMainMenuEl(),
	  i,
	  max;

   for ( i = 0, max = pages.length; i < max; i++ ) {
     // Create menu markup
     menuMarkup.appendChild( helpers.createMenuItem( pages[i] ) );
   }

   mainMenuEl.appendChild( menuMarkup );

 };


/**
 * Creates Markup for Blog Posts
 *
 * @param {Object} post Post to create markup for
 * @return {Object} articleEl Final post markup
 */
view.createPostMarkup = function( post ) {

  var articleEl = document.createElement( 'article' ),
      titleEl = document.createElement( 'h3' ),
      titleLink = helpers.createLink( post ),
      contentEl = document.createElement( 'div' );

  titleEl.appendChild( titleLink );
  contentEl.appendChild( document.createTextNode( post.content ) );

  articleEl.appendChild( titleEl );
  articleEl.appendChild( contentEl );

  return articleEl;

};

/**
 * Code for the Editor
 */


/**
 * The main Editor object
 *
 */
var editor = {};

editor.currentContent = '';
editor.unSavedContent = false;

/**
 * Initializes the VanillaPress app
 * @returns {void}
 */
editor.init = function() {

  editor.listenEditorToggle();
  editor.checkEditorHidden();

};


/**
 * Updates local storage for post or page
 * @returns {void}
 */
editor.updateContent = function() {

  event.preventDefault();
  model.updateContent( editor.currentContent );
  editor.unSavedContent = false;
  editor.animateSaveBtn();

};


/**
 * Runs when changes take place to editor title
 * @returns {void}
 */
editor.updateTitle = function() {

  var title = helpers.getEditorTitleEl().value;

  editor.currentContent.title = title;
  editor.unSavedContent = true;
  view.updateTitle( title );

};


/**
 * Runs when changes take place to editor title
 * @returns {void}
 */
editor.updateMainContent = function() {

  var content = helpers.getEditorContentEl().value;

  editor.currentContent.content = content;
  editor.unSavedContent = true;
  view.updateContent( content );

};


/**
 * Dynamically fills the edit form based on the url
 * @param {Object} contentObj The object of post or page to load
 * @returns {void}
 */
editor.loadEditForm = function( contentObj ) {

  var titleForm = helpers.getEditorTitleEl(),
      contentForm = helpers.getEditorContentEl();

  titleForm.value = contentObj.title;
  contentForm.value = contentObj.content;

  if ( 'blog' === contentObj.slug ) {
    contentForm.setAttribute( 'readonly', 'readonly' );
  } else {
    contentForm.removeAttribute( 'readonly' );
  }

  editor.addFormListeners();

};


/**
 * Animates the Update button to mimic saving data
 * @returns {void}
 */
editor.animateSaveBtn = function() {

  var btn = helpers.getEditorUpdateBtnEl(),
      saved = function() {
        setTimeout(function(){
          btn.innerText = 'Update';
        }, 1000);
      };
      saving = function() {
        setTimeout(function(){
          btn.innerText = 'Saved!';
          saved();
        }, 900);
      };

  btn.innerText = 'Saving...';
  saving();

};

/**
 * Adds event listeners for the title and content
 * @returns {void}
 */
 editor.addFormListeners = function() {

   var titleField = helpers.getEditorTitleEl(),
       contentField = helpers.getEditorContentEl(),
       updateBtn = helpers.getEditorUpdateBtnEl(),
       links = helpers.getLinks();

   titleField.addEventListener(
     'input',
     editor.updateTitle,
     false
   );
   contentField.addEventListener(
     'input',
     editor.updateMainContent,
     false
   );
   updateBtn.addEventListener(
     'click',
     editor.updateContent,
     false
   );


   links.forEach( function( link ) {

     link.addEventListener(
       'click',
       editor.protectUnsavedContent,
       false
     );

   });

 };


/**
 * Adds alert if links are clicked with unsaved content
 * @returns {void}
 */
editor.protectUnsavedContent = function() {
  var confirm;

  if ( true === editor.unSavedContent ) {

    confirm = window.confirm( 'You have unsaved content' );

    if ( false === confirm ) {
      event.preventDefault();
    } else {
      editor.unSavedContent = false;
    }

  }

};

/**
 * Listens for the editor toggle button
 * @returns {void}
 */
editor.listenEditorToggle = function() {

  var toggleEl = helpers.getEditorToggleLink();

  toggleEl.addEventListener( 'click', function() {
    editor.toggle();
    event.preventDefault();
  }, false );

};


/**
 * Opens editor if local store has editor visible
 * @returns {void}
 */
editor.checkEditorHidden = function() {

  var isHidden = model.getEditorHidden();

  if( false === isHidden ) {
    editor.toggle();
  }

};

/**
 * Controls the toggle for the editor
 * @returns {void}
 */
editor.toggle = function() {

  var editorEl = helpers.getEditorEl(),
      toggleEl = helpers.getEditorToggleEl(),
      links = helpers.getLinks();

  editor.currentContent = model.getCurrentContent();

  editorEl.classList.toggle( 'hidden' );
  toggleEl.classList.toggle( 'hidden' );

  if( false === toggleEl.classList.contains( 'hidden' ) ) {

    editor.loadEditForm( editor.currentContent );
    model.updateEditorHidden( false );

  } else {

    model.updateEditorHidden( true );

    links.forEach( function( link ) {

      link.removeEventListener(
        'click',
        editor.protectUnsavedContent,
        false
      );

    });

  }

};

/**
 * Main app file.  Initializes app components.
 */


/**
 * The main app object.
 *
 */
var vanillaPress = {};


/**
 * Initializes the VanillaPress app
 * @return {void}
 */
vanillaPress.init = function() {

  model.init();
  router.init();
  view.init();
  editor.init();
  console.log( 'Testing 2' );

};

vanillaPress.init();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEuanMiLCJoZWxwZXJzLmpzIiwibW9kZWwuanMiLCJyb3V0ZXIuanMiLCJ2aWV3LmpzIiwiZWRpdG9yLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIE1haW4gSlNPTiBvYmplY3Qgb2YgcG9zdHMsIHBhZ2VzIGFuZCBzZXR0aW5nc1xuICovXG52YXIgcG9zdHMgPVxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOjEsXG4gICAgICAgIFwiZGF0ZVwiOlwiMjAxNi0wMS0wOVQyMjowNTowOVwiLFxuICAgICAgICBcIm1vZGlmaWVkXCI6XCIyMDE2LTAxLTA5VDIyOjA1OjA5XCIsXG4gICAgICAgIFwic2x1Z1wiOlwiaGVsbG8td29ybGRcIixcbiAgICAgICAgXCJ0eXBlXCI6XCJwb3N0XCIsXG4gICAgICAgIFwidGl0bGVcIjpcIkhlbGxvIHdvcmxkIVwiLFxuICAgICAgICBcImNvbnRlbnRcIjpcIldlbGNvbWUgdG8gV29yZFByZXNzLiBUaGlzIGlzIHlvdXIgZmlyc3QgcG9zdC4gRWRpdCBvciBkZWxldGUgaXQsIHRoZW4gc3RhcnQgd3JpdGluZyFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOjIsXG4gICAgICAgIFwiZGF0ZVwiOlwiMjAxNi0wMS0xMFQyMjowNTowOVwiLFxuICAgICAgICBcIm1vZGlmaWVkXCI6XCIyMDE2LTAxLTEwVDIyOjA1OjA5XCIsXG4gICAgICAgIFwic2x1Z1wiOlwibGVhcm5pbmctamF2YXNjcmlwdFwiLFxuICAgICAgICBcInR5cGVcIjpcInBvc3RcIixcbiAgICAgICAgXCJ0aXRsZVwiOlwiTGVhcm5pbmcgSmF2YVNjcmlwdCFcIixcbiAgICAgICAgXCJjb250ZW50XCI6XCJJJ20gbGVhcm5pbmcgSmF2YVNjcmlwdCBhbmQgc3VwZXIgZXhjaXRlZCEhIVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6MyxcbiAgICAgICAgXCJkYXRlXCI6XCIyMDE2LTAxLTExVDIyOjA1OjA5XCIsXG4gICAgICAgIFwibW9kaWZpZWRcIjpcIjIwMTYtMDEtMTFUMjI6MDU6MDlcIixcbiAgICAgICAgXCJzbHVnXCI6XCJyZXN0LWFwaVwiLFxuICAgICAgICBcInR5cGVcIjpcInBvc3RcIixcbiAgICAgICAgXCJ0aXRsZVwiOlwiVGhlIFJFU1QgQVBJIVwiLFxuICAgICAgICBcImNvbnRlbnRcIjpcIkkndmUgc3RhcnRlZCB3b3JraW5nIHdpdGggdGhlIFJFU1QgQVBJIGluIFdvcmRQcmVzcywgd2hhdCBmdW4hXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjo0LFxuICAgICAgICBcImRhdGVcIjpcIjIwMTYtMDEtMTJUMjI6MDU6MDlcIixcbiAgICAgICAgXCJtb2RpZmllZFwiOlwiMjAxNi0wMS0xMlQyMjowNTowOVwiLFxuICAgICAgICBcInNsdWdcIjpcImpzb24tZGF0YVwiLFxuICAgICAgICBcInR5cGVcIjpcInBvc3RcIixcbiAgICAgICAgXCJ0aXRsZVwiOlwiSlNPTiBEYXRhIVwiLFxuICAgICAgICBcImNvbnRlbnRcIjpcIlNvLCB3aXRoIHRoZSBSRVNUIEFQSSBpdCBpcyBwb3NpYmxlIHRvIHB1bGwgaW4gV29yZFByZXNzIGRhdGEgYXMgcHVyZSBKU09OLiAgTm93IEknbSBmaWd1cmluZyBvdXQgd2hhdCB0byBkbyB3aXRoIHRoZSBkYXRhXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjo1LFxuICAgICAgICBcImRhdGVcIjpcIjIwMTYtMDEtMTNUMjI6MDU6MDlcIixcbiAgICAgICAgXCJtb2RpZmllZFwiOlwiMjAxNi0wMS0xM1QyMjowNTowOVwiLFxuICAgICAgICBcInNsdWdcIjpcImphdmFzY3JpcHQtcHJvamVjdFwiLFxuICAgICAgICBcInR5cGVcIjpcInBvc3RcIixcbiAgICAgICAgXCJ0aXRsZVwiOlwiSmF2YVNjcmlwdCBQcm9qZWN0XCIsXG4gICAgICAgIFwiY29udGVudFwiOlwiSSd2ZSBzdGFydGVkIHdvcmtpbmcgd2l0aCB0aGUgUkVTVCBBUEkgaW4gV29yZFByZXNzLCB3aGF0IGZ1biFcIlxuICAgICAgfVxuICAgIF0sXG4gICAgcGFnZXMgPVxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOjYsXG4gICAgICAgIFwiZGF0ZVwiOlwiMjAxNi0wMS0xOFQyMjowNTowOVwiLFxuICAgICAgICBcIm1vZGlmaWVkXCI6XCIyMDE2LTAxLTE4VDIyOjA1OjA5XCIsXG4gICAgICAgIFwic2x1Z1wiOlwiaG9tZVwiLFxuICAgICAgICBcInR5cGVcIjpcInBhZ2VcIixcbiAgICAgICAgXCJ0aXRsZVwiOlwiSG9tZVwiLFxuICAgICAgICBcImNvbnRlbnRcIjpcIldlbGNvbWUgdG8gVmFuaWxsYVByZXNzLCBteSBKYXZhU2NyaXB0IHNpdGUhXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjo3LFxuICAgICAgICBcImRhdGVcIjpcIjIwMTYtMDEtMThUMjI6MDU6MDlcIixcbiAgICAgICAgXCJtb2RpZmllZFwiOlwiMjAxNi0wMS0xOFQyMjowNTowOVwiLFxuICAgICAgICBcInNsdWdcIjpcImFib3V0XCIsXG4gICAgICAgIFwidHlwZVwiOlwicGFnZVwiLFxuICAgICAgICBcInRpdGxlXCI6XCJBYm91dFwiLFxuICAgICAgICBcImNvbnRlbnRcIjpcIkEgbGl0dGxlIGFib3V0IG1lIVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6OCxcbiAgICAgICAgXCJkYXRlXCI6XCIyMDE2LTAxLTE4VDIyOjA1OjA5XCIsXG4gICAgICAgIFwibW9kaWZpZWRcIjpcIjIwMTYtMDEtMThUMjI6MDU6MDlcIixcbiAgICAgICAgXCJzbHVnXCI6XCJibG9nXCIsXG4gICAgICAgIFwidHlwZVwiOlwicGFnZVwiLFxuICAgICAgICBcInRpdGxlXCI6XCJCbG9nXCIsXG4gICAgICAgIFwiY29udGVudFwiOlwiUGxlYXNlIGVuam95IG15IHBvc3RzXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjo5LFxuICAgICAgICBcImRhdGVcIjpcIjIwMTYtMDEtMThUMjI6MDU6MDlcIixcbiAgICAgICAgXCJtb2RpZmllZFwiOlwiMjAxNi0wMS0xOFQyMjowNTowOVwiLFxuICAgICAgICBcInNsdWdcIjpcImNvbnRhY3RcIixcbiAgICAgICAgXCJ0eXBlXCI6XCJwYWdlXCIsXG4gICAgICAgIFwidGl0bGVcIjpcIkNvbnRhY3RcIixcbiAgICAgICAgXCJjb250ZW50XCI6XCJEcm9wIG1lIGEgbGluZSB3aXRoIGFueSBxdWVzdGlvbnMgOilcIlxuICAgICAgfVxuICAgIF0sXG4gICAgc2V0dGluZ3MgPSB7XG4gICAgICBcImVkaXRvckhpZGRlblwiOlwidHJ1ZVwiXG4gICAgfSxcbiAgICBkYXRhID0ge1xuICAgICAgXCJwb3N0c1wiOiBwb3N0cyxcbiAgICAgIFwicGFnZXNcIjogcGFnZXMsXG4gICAgICBcInNldHRpbmdzXCI6IHNldHRpbmdzXG4gICAgfTtcbiIsIi8qKlxuICogSGVscGVyIGZpbGUgZm9yIGV4dHJhIGhlbHBlciBmdW5jdGlvbnNcbiAqL1xuXG4vKipcbiAqIE1haW4gaGVscGVyIG9iamVjdFxuICovXG52YXIgaGVscGVycyA9IHt9O1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIGxpc3QgaXRlbSB3aXRoIGEgbGluayBpbnNpZGUgZm9yIG1lbnVzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnRPYmogUGFnZSBvYmplY3QgdG8gY3JlYXRlIG1lbnUgaXRlbSBmb3JcbiAqIEByZXR1cm4ge09iamVjdH0gbWVudUl0ZW1FbCBMaXN0IGl0ZW0gRE9NIG9iamVjdFxuICovXG4gaGVscGVycy5jcmVhdGVNZW51SXRlbSA9IGZ1bmN0aW9uKCBjb250ZW50T2JqICkge1xuXG4gICB2YXIgbWVudUl0ZW1FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdsaScgKTtcblxuICAgbWVudUl0ZW1FbC5hcHBlbmRDaGlsZCggaGVscGVycy5jcmVhdGVMaW5rKCBjb250ZW50T2JqICkgKTtcblxuICAgcmV0dXJuIG1lbnVJdGVtRWw7XG5cbiB9O1xuXG4vKipcbiAqIENyZWF0ZXMgbGlua1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZW50T2JqIENvbnRlbnQgb2JqZWN0IHRvIGNyZWF0ZSBsaW5rIGZvclxuICogQHJldHVybiB7T2JqZWN0fSBsaW5rRWwgTGluayBvYmplY3RcbiAqL1xuaGVscGVycy5jcmVhdGVMaW5rID0gZnVuY3Rpb24oIGNvbnRlbnRPYmogKSB7XG5cbiAgdmFyIGxpbmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdhJyApLFxuICAgICBsaW5rVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSggY29udGVudE9iai50aXRsZSApO1xuXG4gIGlmICggJ2hvbWUnICE9PSBjb250ZW50T2JqLnNsdWcgKSB7XG4gICAgbGlua0VsLmhyZWYgPSAnIycgKyBjb250ZW50T2JqLnNsdWc7XG4gIH0gZWxzZSB7XG4gICAgbGlua0VsLmhyZWYgPSAnIyc7XG4gIH1cbiAgbGlua0VsLmFwcGVuZENoaWxkKCBsaW5rVGl0bGUgKTtcblxuICByZXR1cm4gbGlua0VsO1xuXG59O1xuXG4vKipcbiAqIEdldHMgdGhlIG1haW4gbWVudSBlbGVtZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9IE1haW4gbWVudSBET00gb2JqZWN0XG4gKi9cbmhlbHBlcnMuZ2V0TWFpbk1lbnVFbCA9IGZ1bmN0aW9uKCl7XG4gcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcjbWFpbk5hdiB1bCcgKTtcbn07XG5cbi8qKlxuICogR2V0cyBwYWdlIHRpdGxlIGZyb20gdGhlIERPTVxuICogQHJldHVybiB7T2JqZWN0fSBNYWluIHBhZ2UgdGl0bGUgRE9NIG9iamVjdFxuICovXG5oZWxwZXJzLmdldFBhZ2VUaXRsZUVsID0gZnVuY3Rpb24oKSB7XG5cbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGFnZVRpdGxlJyApO1xuXG59O1xuXG4vKipcbiAqIEdldCBsaW5rcyBpbiB0aGUgdmlld1xuICogQHJldHVybiB7T2JqZWN0fSBBbGwgbGlua3MgaW4gdGhlIHZpZXdcbiAqL1xuaGVscGVycy5nZXRMaW5rcyA9IGZ1bmN0aW9uKCkge1xuXG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnYScgKTtcblxufTtcblxuXG4vKipcbiAqIEdldHMgcGFnZSBjb250ZW50IGZyb20gdGhlIERPTVxuICogQHJldHVybiB7T2JqZWN0fSBNYWluIGNvbnRlbnQgRE9NIG9iamVjdFxuICovXG5oZWxwZXJzLmdldFBhZ2VDb250ZW50RWwgPSBmdW5jdGlvbigpIHtcblxuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwYWdlQ29udGVudCcgKTtcblxufTtcblxuLyoqXG4gKiBHZXRzIGVkaXRvciBFbGVtZW50IGluIHRoZSBET01cbiAqIEByZXR1cm4ge09iamVjdH0gTWFpbiBlZGl0b3IgRE9NIG9iamVjdFxuICovXG5oZWxwZXJzLmdldEVkaXRvckVsID0gZnVuY3Rpb24oKSB7XG5cbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZWRpdG9yJyApO1xuXG59O1xuXG4vKipcbiAqIEdldHMgZWRpdG9yIHRvZ2dsZSBFbGVtZW50IGluIHRoZSBET01cbiAqIEByZXR1cm4ge09iamVjdH0gTWFpbiB0b2dnbGUgZWxlbWVudFxuICovXG5oZWxwZXJzLmdldEVkaXRvclRvZ2dsZUVsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2VkaXRvclRvZ2dsZScgKTtcbn07XG5cbi8qKlxuICogR2V0cyBlZGl0b3IgdG9nZ2xlIGxpbmsgRWxlbWVudCBpbiB0aGUgRE9NXG4gKiBAcmV0dXJuIHtPYmplY3R9IE1haW4gdG9nZ2xlIGxpbmtcbiAqL1xuaGVscGVycy5nZXRFZGl0b3JUb2dnbGVMaW5rID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2VkaXRvclRvZ2dsZSBhJyApO1xufTtcblxuLyoqXG4gKiBHZXRzIGVkaXRvciB0aXRsZSBmb3JtIGVsZW1lbnRcbiAqIEByZXR1cm4ge09iamVjdH0gVGl0bGUgZm9ybSBlbGVtZW50XG4gKi9cbmhlbHBlcnMuZ2V0RWRpdG9yVGl0bGVFbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdlZGl0VGl0bGUnICk7XG59O1xuXG4vKipcbiAqIEdldHMgZWRpdG9yIGNvbnRlbnQgZm9ybSBlbGVtZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9IENvbnRlbnQgZm9ybSBlbGVtZW50XG4gKi9cbmhlbHBlcnMuZ2V0RWRpdG9yQ29udGVudEVsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2VkaXRDb250ZW50JyApO1xufTtcblxuLyoqXG4gKiBHZXRzIGVkaXRvciBmb3JtIHVwZGF0ZSBidXR0b25cbiAqIEByZXR1cm4ge09iamVjdH0gQ29udGVudCBmb3JtIGVsZW1lbnRcbiAqL1xuaGVscGVycy5nZXRFZGl0b3JVcGRhdGVCdG5FbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdlZGl0VXBkYXRlQnRuJyApO1xufTtcbiIsIi8qKlxuICogTW9kZWwgZmlsZSBmb3Igd29ya2luZyB3aXRoIGRhdGFcbiAqL1xuXG4vKipcbiAqIE1haW4gTW9kZWwgT2JqZWN0XG4gKlxuICovXG52YXIgbW9kZWwgPSB7fTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgTW9kZWxcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5tb2RlbC5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYoIGZhbHNlID09PSBtb2RlbC5jaGVja0xvY2FsU3RvcmUoKSApIHtcbiAgICAgIG1vZGVsLnVwZGF0ZUxvY2FsU3RvcmUoIGRhdGEgKTtcbiAgfVxuXG59O1xuXG5cbi8qKlxuICogR2V0IGEgc2luZ2xlIHBvc3Qgb3IgcGFnZSBiYXNlZCBvbiB0aGUgdXJsIHNsdWdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2x1ZyBUaGUgc2x1ZyBmb3IgdGhlIHBvc3RcbiAqIEByZXR1cm4ge09iamVjdH0gY29udGVudE9iaiBTaW5nbGUgcG9zdCBvciBwYWdlXG4gKlxuICovXG5tb2RlbC5nZXRDb250ZW50ID0gZnVuY3Rpb24oIHNsdWcgKSB7XG5cbiAgdmFyIGNvbnRlbnRPYmogPSBtb2RlbC5nZXRQb3N0KCBzbHVnICk7XG5cblxuICAvLyBJZiBwb3N0IGlzIG5vdCBmb3VuZCwgc2VhcmNoIHBhZ2VzXG4gIGlmKCBudWxsID09PSBjb250ZW50T2JqICkge1xuICAgIGNvbnRlbnRPYmogPSBtb2RlbC5nZXRQYWdlKCBzbHVnICk7XG4gIH1cblxuICAvLyBJZiBwYWdlIG5vdCBmb3VuZCwgYXNzaWduIDQwNCBlcnJvclxuICBpZiggbnVsbCA9PT0gY29udGVudE9iaiApIHtcbiAgICBjb250ZW50T2JqID0ge1xuICAgICAgICB0aXRsZTogJzQwNCBFcnJvcicsXG4gICAgICAgIGNvbnRlbnQ6ICdDb250ZW50IG5vdCBmb3VuZCdcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGNvbnRlbnRPYmo7XG5cbn07XG5cblxuLyoqXG4gKiBHZXQgYSBzaW5nbGUgcG9zdCBvciBwYWdlIGJhc2VkIG9uIHRoZSBjdXJyZW50IHVybFxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gY29udGVudE9iaiBTaW5nbGUgcG9zdCBvciBwYWdlXG4gKlxuICovXG5tb2RlbC5nZXRDdXJyZW50Q29udGVudCA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciBzbHVnID0gcm91dGVyLmdldFNsdWcoKSxcbiAgICAgIGNvbnRlbnRPYmogPSBtb2RlbC5nZXRDb250ZW50KCBzbHVnICk7XG5cbiAgcmV0dXJuIGNvbnRlbnRPYmo7XG5cbn07XG5cblxuLyoqXG4gKiBHZXRzIHBvc3RzIGZyb20gbG9jYWwgc3RvcmVcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3RbXX0gcG9zdHMgQXJyYXkgb2YgcG9zdHNcbiAqL1xubW9kZWwuZ2V0UG9zdHMgPSBmdW5jdGlvbigpIHtcblxuICB2YXIgcG9zdHMgPSBtb2RlbC5nZXRMb2NhbFN0b3JlKCkucG9zdHM7XG4gIHJldHVybiBwb3N0cztcblxufTtcblxuLyoqXG4gKiBHZXQgYSBzaW5nbGUgcG9zdCBiYXNlZCBvbiB1cmwgc2x1Z1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzbHVnIFRoZSBzbHVnIGZvciB0aGUgcG9zdFxuICogQHJldHVybiB7T2JqZWN0fSBwb3N0IFNpbmdsZSBwb3N0XG4gKlxuICovXG5tb2RlbC5nZXRQb3N0ID0gZnVuY3Rpb24oIHNsdWcgKSB7XG5cbiAgdmFyIHBvc3RzID0gbW9kZWwuZ2V0TG9jYWxTdG9yZSgpLnBvc3RzO1xuXG4gIC8vIEdldCB0aGUgcG9zdCBmcm9tIHN0b3JlIGJhc2VkIG9uIHRoZSBzbHVnXG4gIGZvciggaSA9IDAsIG1heCA9IHBvc3RzLmxlbmd0aDsgaSA8IG1heDsgaSsrICApIHtcblxuICAgIGlmKCBzbHVnID09PSBwb3N0c1tpXS5zbHVnICkge1xuICAgICAgcmV0dXJuIHBvc3RzW2ldO1xuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG5cbn07XG5cbi8qKlxuICogR2V0cyBwYWdlcyBmcm9tIGxvY2FsIHN0b3JlXG4gKlxuICogQHJldHVybiB7T2JqZWN0W119IHBhZ2VzIEFycmF5IG9mIHBhZ2Ugb2JqZWN0c1xuICovXG5tb2RlbC5nZXRQYWdlcyA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciBwYWdlcyA9IG1vZGVsLmdldExvY2FsU3RvcmUoKS5wYWdlcztcbiAgcmV0dXJuIHBhZ2VzO1xuXG59O1xuXG4vKipcbiAqIEdldCBhIHNpbmdsZSBwYWdlIGJhc2VkIG9uIHVybCBzbHVnXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNsdWcgVGhlIHNsdWcgZm9yIHRoZSBwYWdlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHBhZ2UgIFNpbmdsZSBwYWdlIG9iamVjdFxuICpcbiAqL1xubW9kZWwuZ2V0UGFnZSA9IGZ1bmN0aW9uKCBzbHVnICkge1xuXG4gIHZhciBwYWdlcyA9IG1vZGVsLmdldExvY2FsU3RvcmUoKS5wYWdlcztcblxuICBpZiggbnVsbCA9PT0gc2x1ZyApIHNsdWcgPSAnaG9tZSc7XG5cbiAgLy8gR2V0IHRoZSBwb3N0IGZyb20gc3RvcmUgYmFzZWQgb24gdGhlIHNsdWdcbiAgZm9yKCBpID0gMCwgbWF4ID0gcGFnZXMubGVuZ3RoOyBpIDwgbWF4OyBpKysgICkge1xuXG4gICBpZiggc2x1ZyA9PT0gcGFnZXNbaV0uc2x1ZyApIHtcbiAgICAgcmV0dXJuIHBhZ2VzW2ldO1xuICAgfVxuXG4gIH1cblxuICByZXR1cm4gbnVsbDtcblxufTtcblxuXG4vKipcbiAqIFVwZGF0ZXMgcG9zdCBvciBwYWdlIGluIGxvY2FsIHN0b3JlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnRPYmogQ29udGVudCBvYmplY3QgdG8gdXBkYXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xubW9kZWwudXBkYXRlQ29udGVudCA9IGZ1bmN0aW9uKCBjb250ZW50T2JqICkge1xuXG4gIHZhciBzdG9yZSA9IG1vZGVsLmdldExvY2FsU3RvcmUoKSxcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIGlmKCAncG9zdCcgPT09IGNvbnRlbnRPYmoudHlwZSApIHtcbiAgICBzdG9yZS5wb3N0cy5mb3JFYWNoKCBmdW5jdGlvbiggcG9zdCApIHtcbiAgICAgIGlmKCBjb250ZW50T2JqLmlkID09PSBwb3N0LmlkICkge1xuICAgICAgICBwb3N0LnRpdGxlID0gY29udGVudE9iai50aXRsZTtcbiAgICAgICAgcG9zdC5jb250ZW50ID0gY29udGVudE9iai5jb250ZW50O1xuICAgICAgICBwb3N0Lm1vZGlmaWVkID0gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKCAncGFnZScgPT09IGNvbnRlbnRPYmoudHlwZSApIHtcbiAgICBzdG9yZS5wYWdlcy5mb3JFYWNoKCBmdW5jdGlvbiggcGFnZSApIHtcbiAgICAgIGlmKCBjb250ZW50T2JqLmlkID09PSBwYWdlLmlkICkge1xuICAgICAgICBwYWdlLnRpdGxlID0gY29udGVudE9iai50aXRsZTtcbiAgICAgICAgcGFnZS5jb250ZW50ID0gY29udGVudE9iai5jb250ZW50O1xuICAgICAgICBwYWdlLm1vZGlmaWVkID0gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxuICBtb2RlbC51cGRhdGVMb2NhbFN0b3JlKCBzdG9yZSApO1xuXG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyBpZiBlZGl0b3IgaXMgaGlkZGVuXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBpc0hpZGRlbiBJZiBlZGl0b3IgaXMgaGlkZGVuIG9yIG5vdFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbm1vZGVsLnVwZGF0ZUVkaXRvckhpZGRlbiA9IGZ1bmN0aW9uKCBpc0hpZGRlbiApIHtcblxuICB2YXIgc3RvcmUgPSBtb2RlbC5nZXRMb2NhbFN0b3JlKCk7XG5cbiAgc3RvcmUuc2V0dGluZ3MuZWRpdG9ySGlkZGVuID0gaXNIaWRkZW47XG4gIG1vZGVsLnVwZGF0ZUxvY2FsU3RvcmUoIHN0b3JlICk7XG5cbn07XG5cbi8qKlxuICogR2V0cyBsb2NhbCBzdG9yZSBzZXR0aW5nIGZvciBpZiBlZGl0b3IgaXMgaGlkZGVuXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gaGlkZGVuIEEgYm9vbGVhbiBmb3IgaWYgZWRpdG9yIGlzIGhpZGRlblxuICovXG5tb2RlbC5nZXRFZGl0b3JIaWRkZW4gPSBmdW5jdGlvbigpIHtcblxuICB2YXIgc3RvcmUgPSBtb2RlbC5nZXRMb2NhbFN0b3JlKCk7XG5cbiAgcmV0dXJuIHN0b3JlLnNldHRpbmdzLmVkaXRvckhpZGRlbjtcblxufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgbG9jYWwgc3RvcmUgYWxyZWFkeSBleGlzdHNcbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufSBCb29sZWFuIHZhbHVlIGZvciBpZiBsb2NhbCBzdG9yZSBhbHJlYWR5IGV4aXN0c1xuICovXG5tb2RlbC5jaGVja0xvY2FsU3RvcmUgPSBmdW5jdGlvbigpIHtcblxuICB2YXIgc3RvcmUgPSBtb2RlbC5nZXRMb2NhbFN0b3JlKCk7XG5cbiAgaWYgKCBudWxsID09PSBzdG9yZSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxufTtcblxuXG4vKipcbiAqIEdldHMgY29udGVudCBmcm9tIGxvY2FsIHN0b3JlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBzdG9yZSBOYXRpdmUgSmF2YVNjcmlwdCBvYmplY3QgZnJvbSBsb2NhbCBzdG9yZVxuICovXG5tb2RlbC5nZXRMb2NhbFN0b3JlID0gZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHN0b3JlID0gSlNPTi5wYXJzZSggbG9jYWxTdG9yYWdlLmdldEl0ZW0oICd2YW5pbGxhUHJlc3MnICkgKTtcblxuICByZXR1cm4gc3RvcmU7XG5cbn07XG5cbi8qKlxuICogU2F2ZXMgdGVtcG9yYXJ5IHN0b3JlIHRvIGxvY2FsIHN0b3JhZ2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0b3JlIE5hdGl2ZSBKYXZhU2NyaXB0IG9iamVjdCB3aXRoIHNpdGUgZGF0YVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbm1vZGVsLnVwZGF0ZUxvY2FsU3RvcmUgPSBmdW5jdGlvbiggc3RvcmUgKSB7XG5cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oICd2YW5pbGxhUHJlc3MnLCBKU09OLnN0cmluZ2lmeSggc3RvcmUgKSApO1xuXG59O1xuXG4vKipcbiAqIERlbGV0ZXMgZGF0YSBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5tb2RlbC5yZW1vdmVMb2NhbFN0b3JlID0gZnVuY3Rpb24oKSB7XG5cbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oICd2YW5pbGxhUHJlc3MnICk7XG5cbn07XG4iLCIvKipcbiAqIFJvdXRlciBmaWxlIGZvciBtYW5hZ2luZyB1cmwgY2hhbmdlc1xuICovXG5cbi8qKlxuICogVGhlIG1haW4gcm91dGVyIG9iamVjdC5cbiAqXG4gKi9cbnZhciByb3V0ZXIgPSB7fTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUm91dGVyXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xucm91dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICByb3V0ZXIubG9hZENvbnRlbnQoKTtcbiAgcm91dGVyLmxpc3RlblBhZ2VDaGFuZ2UoKTtcblxufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBzbHVnIGZyb20gdGhlIFVSTFxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gc2x1ZyBTbHVnIGZyb20gVVJMXG4gKi9cbnJvdXRlci5nZXRTbHVnID0gZnVuY3Rpb24oKSB7XG5cbiAgc2x1ZyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXG4gIGlmKCBcIlwiID09PSBzbHVnICkge1xuXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgfSBlbHNlIHtcblxuICAgIHJldHVybiBzbHVnLnN1YnN0ciggMSApO1xuXG4gIH1cblxufTtcblxuLyoqXG4gKiBMaXN0ZW5lciBmdW5jdGlvbiBmb3IgVVJMIGNoYW5nZXNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5yb3V0ZXIubGlzdGVuUGFnZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnaGFzaGNoYW5nZScsIHJvdXRlci5sb2FkQ29udGVudCwgZmFsc2UgKTtcblxufTtcblxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0byBsb2FkIGJsb2cgcG9zdHNcbiAqIG9yIHNpbmdsZSBwb3N0XG4gKlxuICovXG5cbnJvdXRlci5sb2FkQ29udGVudCA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciB1cmwgPSByb3V0ZXIuZ2V0U2x1ZygpLFxuICAgICAgY29udGVudE9iaiA9IG1vZGVsLmdldENvbnRlbnQoIHVybCApLFxuICAgICAgZWRpdG9yRWwgPSBoZWxwZXJzLmdldEVkaXRvckVsKCk7XG5cbiAgdmlldy5jbGVhckNvbnRlbnQoKTtcblxuICBpZiggbnVsbCA9PT0gdXJsICkge1xuXG4gICAgdmlldy5sb2FkU2luZ2xlQ29udGVudCggJ2hvbWUnICk7XG5cbiAgfSBlbHNlIGlmKCAnYmxvZycgPT09IHVybCApIHtcblxuICAgIHZpZXcubG9hZEJsb2dQb3N0cygpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICB2aWV3LmxvYWRTaW5nbGVDb250ZW50KCB1cmwgKTtcblxuICB9XG5cbiAgZWRpdG9yLmN1cnJlbnRDb250ZW50ID0gY29udGVudE9iajtcbiAgaWYoIGZhbHNlID09PSBlZGl0b3JFbC5jbGFzc0xpc3QuY29udGFpbnMoICdoaWRkZW4nICkgKSB7XG5cbiAgICBlZGl0b3IubG9hZEVkaXRGb3JtKCBlZGl0b3IuY3VycmVudENvbnRlbnQgKTtcblxuICB9XG5cbn07XG4iLCIvKipcbiAqIFZpZXcgZmlsZSBmb3IgZGlzcGxheWluZyBjb250ZW50XG4gKi9cblxuXG4vKipcbiAqIE1haW4gdmlldyBvYmplY3RcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG52YXIgdmlldyA9IHt9O1xuXG5cbi8qKlxuICogQ2FsbHMgaW5pdGlhbCBWaWV3IG1ldGhvZHNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG52aWV3LmluaXQgPSBmdW5jdGlvbigpIHtcblxuICB2aWV3LmNyZWF0ZU1haW5NZW51KCk7XG5cbn07XG5cblxuLyoqXG4gKiBHZXRzIGJsb2cgcG9zdHMgYW5kIGFwcGVuZHMgdGhlbSB0byB0aGUgcGFnZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbnZpZXcubG9hZEJsb2dQb3N0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciBwb3N0cyA9IG1vZGVsLmdldFBvc3RzKCksXG4gICAgICBwb3N0c01hcmt1cCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgIHRpdGxlRWwgPSBoZWxwZXJzLmdldFBhZ2VUaXRsZUVsKCksXG4gICAgICBjb250ZW50RWwgPSBoZWxwZXJzLmdldFBhZ2VDb250ZW50RWwoKSxcblx0IGksXG5cdCBtYXg7XG5cblxuICBmb3IgKCBpID0gMCwgbWF4ID0gcG9zdHMubGVuZ3RoOyBpIDwgbWF4OyBpKysgKSB7XG4gICAgcG9zdHNNYXJrdXAuYXBwZW5kQ2hpbGQoIHZpZXcuY3JlYXRlUG9zdE1hcmt1cCggcG9zdHNbaV0gKSApO1xuICB9XG5cbiAgY29udGVudEVsLmFwcGVuZENoaWxkKCBwb3N0c01hcmt1cCApO1xuICB0aXRsZUVsLmlubmVySFRNTCA9ICdCbG9nIFBvc3RzJztcblxufTtcblxuXG4vKipcbiAqIERpc3BsYXlzIGEgc2luZ2xlIHBvc3Qgb3IgcGFnZSBiYXNlZCBvbiBVUkxcbiAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnIFRoZSB1cmwgc2x1ZyBvZiB0aGUgcG9zdCBvciBwYWdlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuIHZpZXcubG9hZFNpbmdsZUNvbnRlbnQgPSBmdW5jdGlvbiggc2x1ZyApIHtcblxuICAgdmFyIGNvbnRlbnRPYmogPSBtb2RlbC5nZXRDb250ZW50KCBzbHVnICksXG4gICAgICAgdGl0bGVFbCA9IGhlbHBlcnMuZ2V0UGFnZVRpdGxlRWwoKSxcbiAgICAgICBjb250ZW50RWwgPSBoZWxwZXJzLmdldFBhZ2VDb250ZW50RWwoKTtcblxuXG4gICB0aXRsZUVsLmlubmVySFRNTCA9IGNvbnRlbnRPYmoudGl0bGU7XG4gICBjb250ZW50RWwuaW5uZXJIVE1MID0gY29udGVudE9iai5jb250ZW50O1xuXG4gfTtcblxuXG4vKipcbiogVXBkYXRlcyB0aGUgbWFpbiB0aXRsZSBhbmQgY29udGVudCBmb3IgYSBwYWdlIG9yIHBvc3RcbiogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnRPYmogVGhlIHBvc3Qgb3IgcGFnZSBvYmplY3RcbiogQHJldHVybnMge3ZvaWR9XG4qL1xudmlldy51cGRhdGVUaXRsZUFuZENvbnRlbnQgPSBmdW5jdGlvbiggY29udGVudE9iaiApIHtcblxuICB2aWV3LnVwZGF0ZVRpdGxlKCBjb250ZW50T2JqLnRpdGxlICk7XG4gIHZpZXcudXBkYXRlQ29udGVudCggY29udGVudE9iai5jb250ZW50ICk7XG5cbn07XG5cbi8qKlxuKiBVcGRhdGVzIHRoZSBtYWluIHRpdGxlIGZvciBhIHBhZ2Ugb3IgcG9zdFxuKiBAcGFyYW0ge1N0cmluZ30gdGl0bGUgVGhlIHRpdGxlIGZvciBhIHBvc3Qgb3IgcGFnZVxuKiBAcmV0dXJucyB7dm9pZH1cbiovXG52aWV3LnVwZGF0ZVRpdGxlID0gZnVuY3Rpb24oIHRpdGxlICkge1xuXG4gIHZhciB0aXRsZUVsID0gaGVscGVycy5nZXRQYWdlVGl0bGVFbCgpO1xuXG4gIHRpdGxlRWwuaW5uZXJIVE1MID0gdGl0bGU7XG5cbn07XG5cblxuLyoqXG4qIFVwZGF0ZXMgdGhlIG1haW4gY29udGVudCBmb3IgYSBwYWdlIG9yIHBvc3RcbiogQHBhcmFtIHtTdHJpbmd9IGNvbnRlbnQgVGhlIGNvbnRlbnQgZm9yIGEgcG9zdCBvciBwYWdlXG4qIEByZXR1cm5zIHt2b2lkfVxuKi9cbnZpZXcudXBkYXRlQ29udGVudCA9IGZ1bmN0aW9uKCBjb250ZW50ICkge1xuXG4gIHZhciBjb250ZW50RWwgPSBoZWxwZXJzLmdldFBhZ2VDb250ZW50RWwoKTtcblxuICBjb250ZW50RWwuaW5uZXJIVE1MID0gY29udGVudDtcblxufTtcblxuXG4vKipcbiAqIENsZWFycyB0aGUgcGFnZSB0aXRsZSBhbmQgY29udGVudCBmcm9tIHRoZSBwYWdlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xudmlldy5jbGVhckNvbnRlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRpdGxlRWwgPSBoZWxwZXJzLmdldFBhZ2VUaXRsZUVsKCksXG4gICAgICBjb250ZW50RWwgPSBoZWxwZXJzLmdldFBhZ2VDb250ZW50RWwoKTtcblxuICB0aXRsZUVsLmlubmVySFRNTCA9ICcnO1xuICBjb250ZW50RWwuaW5uZXJIVE1MID0gJyc7XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlcyBNYWluIE1lbnUgTGlua3MgZm9yIFBhZ2VzXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuIHZpZXcuY3JlYXRlTWFpbk1lbnUgPSBmdW5jdGlvbigpIHtcblxuICAgdmFyIHBhZ2VzID0gbW9kZWwuZ2V0UGFnZXMoKSxcbiAgICAgICBtZW51TWFya3VwID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuICAgICAgIG1haW5NZW51RWwgPSBoZWxwZXJzLmdldE1haW5NZW51RWwoKSxcblx0ICBpLFxuXHQgIG1heDtcblxuICAgZm9yICggaSA9IDAsIG1heCA9IHBhZ2VzLmxlbmd0aDsgaSA8IG1heDsgaSsrICkge1xuICAgICAvLyBDcmVhdGUgbWVudSBtYXJrdXBcbiAgICAgbWVudU1hcmt1cC5hcHBlbmRDaGlsZCggaGVscGVycy5jcmVhdGVNZW51SXRlbSggcGFnZXNbaV0gKSApO1xuICAgfVxuXG4gICBtYWluTWVudUVsLmFwcGVuZENoaWxkKCBtZW51TWFya3VwICk7XG5cbiB9O1xuXG5cbi8qKlxuICogQ3JlYXRlcyBNYXJrdXAgZm9yIEJsb2cgUG9zdHNcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9zdCBQb3N0IHRvIGNyZWF0ZSBtYXJrdXAgZm9yXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFydGljbGVFbCBGaW5hbCBwb3N0IG1hcmt1cFxuICovXG52aWV3LmNyZWF0ZVBvc3RNYXJrdXAgPSBmdW5jdGlvbiggcG9zdCApIHtcblxuICB2YXIgYXJ0aWNsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2FydGljbGUnICksXG4gICAgICB0aXRsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2gzJyApLFxuICAgICAgdGl0bGVMaW5rID0gaGVscGVycy5jcmVhdGVMaW5rKCBwb3N0ICksXG4gICAgICBjb250ZW50RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXG4gIHRpdGxlRWwuYXBwZW5kQ2hpbGQoIHRpdGxlTGluayApO1xuICBjb250ZW50RWwuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCBwb3N0LmNvbnRlbnQgKSApO1xuXG4gIGFydGljbGVFbC5hcHBlbmRDaGlsZCggdGl0bGVFbCApO1xuICBhcnRpY2xlRWwuYXBwZW5kQ2hpbGQoIGNvbnRlbnRFbCApO1xuXG4gIHJldHVybiBhcnRpY2xlRWw7XG5cbn07XG4iLCIvKipcbiAqIENvZGUgZm9yIHRoZSBFZGl0b3JcbiAqL1xuXG5cbi8qKlxuICogVGhlIG1haW4gRWRpdG9yIG9iamVjdFxuICpcbiAqL1xudmFyIGVkaXRvciA9IHt9O1xuXG5lZGl0b3IuY3VycmVudENvbnRlbnQgPSAnJztcbmVkaXRvci51blNhdmVkQ29udGVudCA9IGZhbHNlO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBWYW5pbGxhUHJlc3MgYXBwXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZWRpdG9yLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBlZGl0b3IubGlzdGVuRWRpdG9yVG9nZ2xlKCk7XG4gIGVkaXRvci5jaGVja0VkaXRvckhpZGRlbigpO1xuXG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyBsb2NhbCBzdG9yYWdlIGZvciBwb3N0IG9yIHBhZ2VcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5lZGl0b3IudXBkYXRlQ29udGVudCA9IGZ1bmN0aW9uKCkge1xuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIG1vZGVsLnVwZGF0ZUNvbnRlbnQoIGVkaXRvci5jdXJyZW50Q29udGVudCApO1xuICBlZGl0b3IudW5TYXZlZENvbnRlbnQgPSBmYWxzZTtcbiAgZWRpdG9yLmFuaW1hdGVTYXZlQnRuKCk7XG5cbn07XG5cblxuLyoqXG4gKiBSdW5zIHdoZW4gY2hhbmdlcyB0YWtlIHBsYWNlIHRvIGVkaXRvciB0aXRsZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmVkaXRvci51cGRhdGVUaXRsZSA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciB0aXRsZSA9IGhlbHBlcnMuZ2V0RWRpdG9yVGl0bGVFbCgpLnZhbHVlO1xuXG4gIGVkaXRvci5jdXJyZW50Q29udGVudC50aXRsZSA9IHRpdGxlO1xuICBlZGl0b3IudW5TYXZlZENvbnRlbnQgPSB0cnVlO1xuICB2aWV3LnVwZGF0ZVRpdGxlKCB0aXRsZSApO1xuXG59O1xuXG5cbi8qKlxuICogUnVucyB3aGVuIGNoYW5nZXMgdGFrZSBwbGFjZSB0byBlZGl0b3IgdGl0bGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5lZGl0b3IudXBkYXRlTWFpbkNvbnRlbnQgPSBmdW5jdGlvbigpIHtcblxuICB2YXIgY29udGVudCA9IGhlbHBlcnMuZ2V0RWRpdG9yQ29udGVudEVsKCkudmFsdWU7XG5cbiAgZWRpdG9yLmN1cnJlbnRDb250ZW50LmNvbnRlbnQgPSBjb250ZW50O1xuICBlZGl0b3IudW5TYXZlZENvbnRlbnQgPSB0cnVlO1xuICB2aWV3LnVwZGF0ZUNvbnRlbnQoIGNvbnRlbnQgKTtcblxufTtcblxuXG4vKipcbiAqIER5bmFtaWNhbGx5IGZpbGxzIHRoZSBlZGl0IGZvcm0gYmFzZWQgb24gdGhlIHVybFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnRPYmogVGhlIG9iamVjdCBvZiBwb3N0IG9yIHBhZ2UgdG8gbG9hZFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmVkaXRvci5sb2FkRWRpdEZvcm0gPSBmdW5jdGlvbiggY29udGVudE9iaiApIHtcblxuICB2YXIgdGl0bGVGb3JtID0gaGVscGVycy5nZXRFZGl0b3JUaXRsZUVsKCksXG4gICAgICBjb250ZW50Rm9ybSA9IGhlbHBlcnMuZ2V0RWRpdG9yQ29udGVudEVsKCk7XG5cbiAgdGl0bGVGb3JtLnZhbHVlID0gY29udGVudE9iai50aXRsZTtcbiAgY29udGVudEZvcm0udmFsdWUgPSBjb250ZW50T2JqLmNvbnRlbnQ7XG5cbiAgaWYgKCAnYmxvZycgPT09IGNvbnRlbnRPYmouc2x1ZyApIHtcbiAgICBjb250ZW50Rm9ybS5zZXRBdHRyaWJ1dGUoICdyZWFkb25seScsICdyZWFkb25seScgKTtcbiAgfSBlbHNlIHtcbiAgICBjb250ZW50Rm9ybS5yZW1vdmVBdHRyaWJ1dGUoICdyZWFkb25seScgKTtcbiAgfVxuXG4gIGVkaXRvci5hZGRGb3JtTGlzdGVuZXJzKCk7XG5cbn07XG5cblxuLyoqXG4gKiBBbmltYXRlcyB0aGUgVXBkYXRlIGJ1dHRvbiB0byBtaW1pYyBzYXZpbmcgZGF0YVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmVkaXRvci5hbmltYXRlU2F2ZUJ0biA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciBidG4gPSBoZWxwZXJzLmdldEVkaXRvclVwZGF0ZUJ0bkVsKCksXG4gICAgICBzYXZlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgYnRuLmlubmVyVGV4dCA9ICdVcGRhdGUnO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICAgIH07XG4gICAgICBzYXZpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIGJ0bi5pbm5lclRleHQgPSAnU2F2ZWQhJztcbiAgICAgICAgICBzYXZlZCgpO1xuICAgICAgICB9LCA5MDApO1xuICAgICAgfTtcblxuICBidG4uaW5uZXJUZXh0ID0gJ1NhdmluZy4uLic7XG4gIHNhdmluZygpO1xuXG59O1xuXG4vKipcbiAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgdGl0bGUgYW5kIGNvbnRlbnRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG4gZWRpdG9yLmFkZEZvcm1MaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuICAgdmFyIHRpdGxlRmllbGQgPSBoZWxwZXJzLmdldEVkaXRvclRpdGxlRWwoKSxcbiAgICAgICBjb250ZW50RmllbGQgPSBoZWxwZXJzLmdldEVkaXRvckNvbnRlbnRFbCgpLFxuICAgICAgIHVwZGF0ZUJ0biA9IGhlbHBlcnMuZ2V0RWRpdG9yVXBkYXRlQnRuRWwoKSxcbiAgICAgICBsaW5rcyA9IGhlbHBlcnMuZ2V0TGlua3MoKTtcblxuICAgdGl0bGVGaWVsZC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAnaW5wdXQnLFxuICAgICBlZGl0b3IudXBkYXRlVGl0bGUsXG4gICAgIGZhbHNlXG4gICApO1xuICAgY29udGVudEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICdpbnB1dCcsXG4gICAgIGVkaXRvci51cGRhdGVNYWluQ29udGVudCxcbiAgICAgZmFsc2VcbiAgICk7XG4gICB1cGRhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgJ2NsaWNrJyxcbiAgICAgZWRpdG9yLnVwZGF0ZUNvbnRlbnQsXG4gICAgIGZhbHNlXG4gICApO1xuXG5cbiAgIGxpbmtzLmZvckVhY2goIGZ1bmN0aW9uKCBsaW5rICkge1xuXG4gICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAnY2xpY2snLFxuICAgICAgIGVkaXRvci5wcm90ZWN0VW5zYXZlZENvbnRlbnQsXG4gICAgICAgZmFsc2VcbiAgICAgKTtcblxuICAgfSk7XG5cbiB9O1xuXG5cbi8qKlxuICogQWRkcyBhbGVydCBpZiBsaW5rcyBhcmUgY2xpY2tlZCB3aXRoIHVuc2F2ZWQgY29udGVudFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmVkaXRvci5wcm90ZWN0VW5zYXZlZENvbnRlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNvbmZpcm07XG5cbiAgaWYgKCB0cnVlID09PSBlZGl0b3IudW5TYXZlZENvbnRlbnQgKSB7XG5cbiAgICBjb25maXJtID0gd2luZG93LmNvbmZpcm0oICdZb3UgaGF2ZSB1bnNhdmVkIGNvbnRlbnQnICk7XG5cbiAgICBpZiAoIGZhbHNlID09PSBjb25maXJtICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWRpdG9yLnVuU2F2ZWRDb250ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gIH1cblxufTtcblxuLyoqXG4gKiBMaXN0ZW5zIGZvciB0aGUgZWRpdG9yIHRvZ2dsZSBidXR0b25cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5lZGl0b3IubGlzdGVuRWRpdG9yVG9nZ2xlID0gZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHRvZ2dsZUVsID0gaGVscGVycy5nZXRFZGl0b3JUb2dnbGVMaW5rKCk7XG5cbiAgdG9nZ2xlRWwuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgZWRpdG9yLnRvZ2dsZSgpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0sIGZhbHNlICk7XG5cbn07XG5cblxuLyoqXG4gKiBPcGVucyBlZGl0b3IgaWYgbG9jYWwgc3RvcmUgaGFzIGVkaXRvciB2aXNpYmxlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZWRpdG9yLmNoZWNrRWRpdG9ySGlkZGVuID0gZnVuY3Rpb24oKSB7XG5cbiAgdmFyIGlzSGlkZGVuID0gbW9kZWwuZ2V0RWRpdG9ySGlkZGVuKCk7XG5cbiAgaWYoIGZhbHNlID09PSBpc0hpZGRlbiApIHtcbiAgICBlZGl0b3IudG9nZ2xlKCk7XG4gIH1cblxufTtcblxuLyoqXG4gKiBDb250cm9scyB0aGUgdG9nZ2xlIGZvciB0aGUgZWRpdG9yXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZWRpdG9yLnRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciBlZGl0b3JFbCA9IGhlbHBlcnMuZ2V0RWRpdG9yRWwoKSxcbiAgICAgIHRvZ2dsZUVsID0gaGVscGVycy5nZXRFZGl0b3JUb2dnbGVFbCgpLFxuICAgICAgbGlua3MgPSBoZWxwZXJzLmdldExpbmtzKCk7XG5cbiAgZWRpdG9yLmN1cnJlbnRDb250ZW50ID0gbW9kZWwuZ2V0Q3VycmVudENvbnRlbnQoKTtcblxuICBlZGl0b3JFbC5jbGFzc0xpc3QudG9nZ2xlKCAnaGlkZGVuJyApO1xuICB0b2dnbGVFbC5jbGFzc0xpc3QudG9nZ2xlKCAnaGlkZGVuJyApO1xuXG4gIGlmKCBmYWxzZSA9PT0gdG9nZ2xlRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCAnaGlkZGVuJyApICkge1xuXG4gICAgZWRpdG9yLmxvYWRFZGl0Rm9ybSggZWRpdG9yLmN1cnJlbnRDb250ZW50ICk7XG4gICAgbW9kZWwudXBkYXRlRWRpdG9ySGlkZGVuKCBmYWxzZSApO1xuXG4gIH0gZWxzZSB7XG5cbiAgICBtb2RlbC51cGRhdGVFZGl0b3JIaWRkZW4oIHRydWUgKTtcblxuICAgIGxpbmtzLmZvckVhY2goIGZ1bmN0aW9uKCBsaW5rICkge1xuXG4gICAgICBsaW5rLnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdjbGljaycsXG4gICAgICAgIGVkaXRvci5wcm90ZWN0VW5zYXZlZENvbnRlbnQsXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuXG4gICAgfSk7XG5cbiAgfVxuXG59O1xuIiwiLyoqXG4gKiBNYWluIGFwcCBmaWxlLiAgSW5pdGlhbGl6ZXMgYXBwIGNvbXBvbmVudHMuXG4gKi9cblxuXG4vKipcbiAqIFRoZSBtYWluIGFwcCBvYmplY3QuXG4gKlxuICovXG52YXIgdmFuaWxsYVByZXNzID0ge307XG5cblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgVmFuaWxsYVByZXNzIGFwcFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFuaWxsYVByZXNzLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBtb2RlbC5pbml0KCk7XG4gIHJvdXRlci5pbml0KCk7XG4gIHZpZXcuaW5pdCgpO1xuICBlZGl0b3IuaW5pdCgpO1xuICBjb25zb2xlLmxvZyggJ1Rlc3RpbmcgMicgKTtcblxufTtcblxudmFuaWxsYVByZXNzLmluaXQoKTtcbiJdfQ==
