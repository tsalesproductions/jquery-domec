/**
 * jQuery DOMEC (DOM Elements Creator) 1.1.0
 * http://code.google.com/p/jquery-domec
 *
 * Copyright (c) 2008-2009 Lukasz Rajchel (lukasz@rajchel.pl | http://rajchel.pl)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Documentation :  http://code.google.com/p/jquery-domec/wiki/Documentation
 * Changelog     :  http://code.google.com/p/jquery-domec/wiki/Changelog
 *
 * Contributors  :  Lukasz Rajchel
 */

/*jslint indent: 4, maxlen: 120 */
/*global document, jQuery*/
/*members DOMEC, addAttributes, addChildren, addEventHandlers, append, attr, attributes, bind, children, create,
createElement, each, events, extend, hasOwnProperty, isArray, isPlainObject, root, text, toString*/
(function ($) {
    'use strict';

    // DOMEC Core class
    $.DOMEC = (function () {
        // variables declaration
        // DOM element
        var Element = (function () {
            return {
                // create element
                create: function (name, root) {
                    // set default root if undefined
                    if (root === undefined || root === null) {
                        root = document;
                    }

                    if (typeof root === 'object' && !$.isArray(root) && typeof name === 'string') {
                        return $(root.createElement(name));
                    }

                    return undefined;
                },

                // add attributes
                addAttributes: function (elem, attr) {
                    if ($.isPlainObject(attr)) {
                        $.each(attr, function (key, val) {
                            if (typeof val === 'string' || typeof val === 'number') {
                                elem.attr(key, val);
                            }
                        });
                    }
                },

                // add event handlers
                addEventHandlers: function (elem, events) {
                    if ($.isPlainObject(events)) {
                        $.each(events, function (key, val) {
                            if (typeof key === 'string' && typeof val === 'function') {
                                elem.bind(key, val);
                            }
                        });
                    }
                },

                // add child elements
                addChildren: function (elem, children) {
                    if (children !== undefined && children !== null) {
                        if ($.isArray(children)) {
                            $.each(children, function () {
                                elem.append(this);
                            });
                        } else if (children instanceof jQuery) {
                            elem.append(children);
                        } else {
                            elem.text(children.toString());
                        }
                    }
                }
            };
        }());

        // DOMEC public members
        return {
            create: function (name, options) {
                var elem;
                if ($.isPlainObject(options) && options.hasOwnProperty('root')) {
                    elem = Element.create(name, options.root);
                } else {
                    elem = Element.create(name);
                }

                if (elem !== undefined && $.isPlainObject(options)) {
                    if (options.hasOwnProperty('attributes')) {
                        Element.addAttributes(elem, options.attributes);
                    }

                    if (options.hasOwnProperty('events')) {
                        Element.addEventHandlers(elem, options.events);
                    }

                    if (options.hasOwnProperty('children')) {
                        Element.addChildren(elem, options.children);
                    }
                }

                return elem;
            }
        };
    }());

    // register jQuery extension
    $.extend({
        create: $.DOMEC.create
    });

}(jQuery));