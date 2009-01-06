/**
 * jQuery DOMEC (DOM Elements Creator) 0.3.2
 * http://code.google.com/p/jquery-domec
 * http://plugins.jquery.com/project/DOMEC
 *
 * Copyright (c) 2008 Lukasz Rajchel (lukasz@rajchel.pl | http://lukasz.rajchel.pl)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Documentation	:	http://code.google.com/p/jquery-domec/wiki/Documentation
 * Changelog:		:	http://code.google.com/p/jquery-domec/wiki/Changelog
 */

(function($) {

 	// register jQuery extension
	$.extend({
		create: function(element, attributes, children) {

			// create new element
			var elem = $(document.createElement(element));

			// add passed attributes
			if (typeof(attributes) == 'object') {
				for (key in attributes) {
					elem.attr(key, attributes[key]);
				}
			}

			// add passed child elements
			if (typeof(children) == 'object') {
				for (i = 0; i < children.length; i++) {
					elem.append(children[i]);
				}
			} else {
				elem.text(children.toString());
			}

			return elem;
		}
	});

})(jQuery);