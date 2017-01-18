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
