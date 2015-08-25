/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var debug = require('debug')('Fluxible:FetchrPlugin');
var DEFAULT_API_PATH = '/api';
var DEFAULT_XHR_TIMEOUT = 3000;
var Fetchr = require('fetchr');
var defaultConstructGetUri = require('fetchr/libs/util/defaultConstructGetUri');

/**
 * Collects metadata from the service calls so that they can be used for response headers
 * @param service
 * @param operation
 * @param metaArray
 * @returns {Function} The proxy method
 */
function crudProxy(service, operation, metaArray) {
    return function crudProxyMethod() {
        debug('service proxy');

        // Faster than calling Array.prototype.slice.call(arguments)
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }

        // replace last argument (callback) with proxy callback
        // this is because 'config' is an optional param for services
        // thus ensuring the proxy callback is always passed in
        var callback = args.pop();
        // create proxy callback to add service meta to the context instance
        var proxyCallback = function (err, data, meta) {
            debug('service proxy callback', data, meta);
            if (meta) {
                metaArray.push(meta);
            }
            callback.apply(null, arguments);
        };

        args.push(proxyCallback);

        // execute service as usual
        service[operation].apply(service, args);
    };
}

/**
 * Creates a new fetchr plugin instance with options
 * @param {Object} options
 * @param {String} options.xhrPath The path to serve XHR requests from
 * @returns {FetchrPlugin}
 */
module.exports = function fetchrPlugin(options) {
    options = options || {};
    var xhrPath = options.xhrPath || DEFAULT_API_PATH;
    var xhrTimeout = options.xhrTimeout || DEFAULT_XHR_TIMEOUT;
    var corsPath = options.corsPath || null;

    /**
     * @class FetchrPlugin
     */
    return {
        /**
         * @property {String} name Name of the plugin
         */
        name: 'FetchrPlugin',
        /**
         * Called to plug the FluxContext
         * @method plugContext
         * @param {Object} contextOptions options passed to the createContext method
         * @param {Object} contextOptions.req The server request object (only supplied if on server)
         * @param {Object} contextOptions.xhrContext Context object that will be used for all
         *      XHR calls from the client. This allows persistence of some values between requests
         *      and also CSRF validation. (e.g. { _csrf: 'a3fc2f', device: "tablet" })
         * @returns {Object}
         */
        plugContext: function plugContext(contextOptions) {
            var xhrContext = contextOptions.xhrContext;
            if (options.getXhrPath) {
                xhrPath = options.getXhrPath(contextOptions);
            }
            return {
                /**
                 * Adds the service CRUD and getServiceMeta methods to the action context
                 * @param actionContext
                 */
                plugActionContext: function plugActionContext(actionContext) {
                    var uri;
                    var serviceMeta = [];

                    var service = new Fetchr({
                        req: contextOptions.req,
                        xhrPath: xhrPath,
                        xhrTimeout: xhrTimeout,
                        corsPath: corsPath,
                        context: xhrContext
                    });
                    actionContext.service = {
                        create: crudProxy(service, 'create', serviceMeta),
                        read: crudProxy(service, 'read', serviceMeta),
                        update: crudProxy(service, 'update', serviceMeta),
                        'delete': crudProxy(service, 'delete', serviceMeta),
                        constructGetXhrUri: function constructGetXhrUri(resource, params, config) {
                            config = config || {};
                            uri = config.cors ? corsPath : xhrPath;
                            var getUriFn = config.constructGetUri || defaultConstructGetUri;
                            return getUriFn.call(service, uri, resource, params, config, xhrContext);
                        },
                        updateOptions: function (options) {
                            xhrPath = options.xhrPath ? options.xhrPath : xhrPath;
                            xhrTimeout = options.xhrTimeout ? options.xhrTimeout : xhrTimeout;
                            corsPath = options.corsPath ? options.corsPath : corsPath;
                            service.updateOptions && service.updateOptions(options);
                        }
                    };
                    actionContext.getServiceMeta = function getServiceMeta() {
                        return serviceMeta;
                    };
                },
                /**
                 * Called to dehydrate plugin options
                 * @method dehydrate
                 * @returns {Object}
                 */
                dehydrate: function dehydrate() {
                    return {
                        xhrContext: contextOptions.xhrContext,
                        xhrPath: xhrPath,
                        xhrTimeout: xhrTimeout,
                        corsPath: corsPath
                    };
                },
                /**
                 * Called to rehydrate plugin options
                 * @method rehydrate
                 * @returns {Object}
                 */
                rehydrate: function rehydrate(state) {
                    xhrContext = state.xhrContext;
                    xhrPath = state.xhrPath;
                    xhrTimeout = state.xhrTimeout;
                    corsPath = state.corsPath;
                }
            };
        },
        /**
         * Registers a service to the manager. Only works on the server!
         * @method registerService
         */
        registerService: function registerService(service) {
            Fetchr.registerFetcher(service);
        },
        /**
         * Get the express middleware. Only works on the server!
         * @method getMiddleware
         * @returns {Function}
         */
        getMiddleware: function () {
            return Fetchr.middleware();
        },
        /**
         * Provides access to the xhr path being used by the plugin
         * @method getXhrPath
         * @returns {String}
         */
        getXhrPath: function getXhrPath() {
            return xhrPath;
        }
    };
};
