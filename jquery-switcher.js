/*! jquery-switcher.js
 *
 * Authored by: Cory Dorning & Brett Metzger
 *
 * Dependencies: jQuery v1.8+
 *
 * Last modified by: Cory Dorning & Brett Metzger
 * Last modified on: 09/18/2014
 *
 * The switcher plugin allows you to switch the content being displayed.
 * You can set a callback, the event type, a slide option and the content
 * target (required) you want to switch.
 *
 */

// include semicolon to make sure any JS before this plugin is terminated
;(function($) {
  // ECMAScript 5 strict mode
  "use strict";

  // begin plugin switcher plugin
  $.fn.switcher = function(options) {

    // set any defaults
    var defaults = {
        activeTargetClass: 'switcher-target-active', // class to add to the selected trigger
        activeContentClass: 'switcher-content-active', // class to add to the selected trigger
        callback: function(){},
        collection: null, // content collection, required
        event: 'click',  // sets the default event type to click
        animate: true, // slide animation?
        target: null,  // target content to show
        trigger: 'a'
      },

    // original jQuery object
      $sel = this,

      dataOptions = {
        activeTargetClass: $sel.data('active-target-class'), // class to add to the selected trigger
        activeContentClass: $sel.data('active-content-class'), // class to add to the selected trigger
        callback: $sel.data('callback') ? window[$sel.data('callback')] || $.ddui.helpers.stringToMethod($sel.data('callback')) : function(){},
        collection: $sel.data('collection'), // content collection, required
        event: $sel.data('event'),  // sets the default event type to click
        animate: $sel.data('animate'), // slide animation?
        target: $sel.data('target'),  // target content to show, required
        trigger: $sel.data('trigger') // selector of the triggers to switch content
      },

    // overwrite 'defaults' with those passed via 'options'
      settings = $.extend(defaults, options, dataOptions),

    // toggle switches displayed content, should run when plugin initializes
      toggler = {

        // hide collection
        _hide: function(){
          $(settings.collection)
            .not(settings.target)
            .removeClass(settings.activeContentClass)
            .hide();

          return this;
        },

        // show target
        _show: function() {
          $(settings.target)
            .addClass(settings.activeContentClass)
            .show(settings.animate ? 400 : 0);
        },

        run: function() {
          this._hide()._show();
        }

      },

    // triggers
      $trigger = $sel.find(settings.trigger);

    // create trigger events
    $trigger
      // add trigger event
      .on(settings.event, function(ev){
        // remove active class and add to current trigger
        $trigger
          .removeClass(settings.activeTargetClass)
          .filter(this)
          .addClass(settings.activeTargetClass);

        //set target to href of link clicked on
        settings.target = $(this).attr('href') || $(this).data('target');

        // run toggler
        toggler.run();

        // run callback
        settings.callback();

        // prevent default trigger action
        ev.preventDefault();
      });

      // find trigger for target content on init
      toggler.run();

    // find trigger for target content on init
    return $sel;

  };
})(jQuery);
// end switcher