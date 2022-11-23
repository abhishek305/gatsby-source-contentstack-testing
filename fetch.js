'use strict';
/**NPM dependencies */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var queryString = require('query-string');

var fetch = require('node-fetch'); // eslint-disable-next-line import/no-unresolved


var _require = require('./package.json'),
    version = _require.version;

var _require2 = require('./contenttype-data'),
    FetchDefaultContentTypes = _require2.FetchDefaultContentTypes,
    FetchSpecifiedContentTypes = _require2.FetchSpecifiedContentTypes,
    FetchUnspecifiedContentTypes = _require2.FetchUnspecifiedContentTypes;

var _require3 = require('./entry-data'),
    FetchDefaultEntries = _require3.FetchDefaultEntries,
    FetchSpecifiedContentTypesEntries = _require3.FetchSpecifiedContentTypesEntries,
    FetchSpecifiedLocalesEntries = _require3.FetchSpecifiedLocalesEntries,
    FetchSpecifiedLocalesAndContentTypesEntries = _require3.FetchSpecifiedLocalesAndContentTypesEntries;

var _require4 = require('./utils'),
    CODES = _require4.CODES;

var OPTION_CLASS_MAPPING = {
  '': FetchDefaultContentTypes,
  contentTypes: FetchSpecifiedContentTypes,
  excludeContentTypes: FetchUnspecifiedContentTypes,
  locales: FetchDefaultContentTypes,
  contentTypeslocales: FetchSpecifiedContentTypes,
  excludeContentTypeslocales: FetchUnspecifiedContentTypes
};
var OPTIONS_ENTRIES_CLASS_MAPPING = {
  '': FetchDefaultEntries,
  contentTypes: FetchSpecifiedContentTypesEntries,
  excludeContentTypes: FetchSpecifiedContentTypesEntries,
  locales: FetchSpecifiedLocalesEntries,
  contentTypeslocales: FetchSpecifiedLocalesAndContentTypesEntries,
  excludeContentTypeslocales: FetchSpecifiedLocalesAndContentTypesEntries
};
var globalConfig;

exports.fetchData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(configOptions, reporter, cache, contentTypeOption) {
    var syncData, entryService, _syncData, contentstackData;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.time('Fetch Contentstack data');
            console.log('Starting to fetch data from Contentstack');
            _context.prev = 2;
            syncData = {};
            entryService = new OPTIONS_ENTRIES_CLASS_MAPPING[contentTypeOption]();
            _context.next = 7;
            return entryService.fetchSyncData(configOptions, cache, fetchSyncData);

          case 7:
            _syncData = _context.sent;
            syncData.data = _syncData.data;
            contentstackData = {
              syncData: syncData.data
            };
            console.timeEnd('Fetch Contentstack data');
            return _context.abrupt("return", {
              contentstackData: contentstackData
            });

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](2);
            reporter.panic({
              id: CODES.SyncError,
              context: {
                sourceMessage: "Fetching contentstack data failed. Please check https://www.contentstack.com/docs/developers/apis/content-delivery-api/ for more help."
              },
              error: _context.t0
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 14]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchContentTypes = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(config, contentTypeOption) {
    var url, responseKey, contentType, allContentTypes;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            globalConfig = config;
            _context2.prev = 1;
            config.cdn = config.cdn ? config.cdn : 'https://cdn.contentstack.io/v3';
            url = 'content_types';
            responseKey = 'content_types';
            contentType = new OPTION_CLASS_MAPPING[contentTypeOption]();
            _context2.next = 8;
            return contentType.getPagedData(url, config, responseKey, getPagedData);

          case 8:
            allContentTypes = _context2.sent;
            return _context2.abrupt("return", allContentTypes);

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            reporter.panic({
              id: CODES.SyncError,
              context: {
                sourceMessage: "Fetching contentstack data failed. Please check https://www.contentstack.com/docs/developers/apis/content-delivery-api/ for more help."
              },
              error: _context2.t0
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));

  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var fetchSyncData = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(query, config) {
    var url, response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = 'stacks/sync';
            _context3.next = 3;
            return getSyncData(url, config, query, 'items');

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchSyncData(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var getData = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(url, options) {
    var retries;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            retries = 0;
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              var handleResponse = function handleResponse() {
                fetch(url, options).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  if (data.error_code) {
                    console.error(data);

                    if (data.error_code >= 500) {
                      throw new Error("Server error: ".concat(data.error_code));
                    }

                    reject(data);
                  } else {
                    if (data.items) {
                      var filteredData = data === null || data === void 0 ? void 0 : data.items.filter(function (item) {
                        return item.data.hasOwnProperty('publish_details');
                      });
                      data.items = filteredData;
                    }

                    resolve(data);
                  }
                })["catch"]( /*#__PURE__*/function () {
                  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err) {
                    var retryAttempt, timeToWait;
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            retryAttempt = globalConfig.httpRetries ? globalConfig.httpRetries : 3;

                            if (!(retries < retryAttempt)) {
                              _context4.next = 9;
                              break;
                            }

                            retries++;
                            timeToWait = Math.pow(2, retries) * 100;
                            _context4.next = 6;
                            return waitFor(timeToWait);

                          case 6:
                            handleResponse();
                            _context4.next = 11;
                            break;

                          case 9:
                            console.error(err);
                            reject(new Error("Fetch failed after ".concat(retryAttempt, " retry attempts.")));

                          case 11:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x11) {
                    return _ref5.apply(this, arguments);
                  };
                }());
              };

              retries = 1;
              handleResponse();
            }));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getData(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var fetchCsData = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(url, config, query) {
    var queryParams, apiUrl, option, data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            query = query || {};
            query.include_count = true;
            query.environment = config.environment;
            queryParams = queryString.stringify(query);
            apiUrl = "".concat(config.cdn, "/").concat(url, "?").concat(queryParams);
            option = {
              headers: {
                'X-User-Agent': "contentstack-gatsby-source-plugin-".concat(version),
                api_key: config.api_key,
                access_token: config.delivery_token
              }
            };
            _context6.next = 8;
            return getData(apiUrl, option);

          case 8:
            data = _context6.sent;
            return _context6.abrupt("return", data);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function fetchCsData(_x12, _x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();

var getPagedData = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(url, config, responseKey) {
    var query,
        skip,
        limit,
        aggregatedResponse,
        response,
        _args7 = arguments;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            query = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
            skip = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : 0;
            limit = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : 100;
            aggregatedResponse = _args7.length > 6 && _args7[6] !== undefined ? _args7[6] : null;
            query.skip = skip;
            query.limit = limit;
            query.include_global_field_schema = true;
            _context7.next = 9;
            return fetchCsData(url, config, query);

          case 9:
            response = _context7.sent;

            if (!aggregatedResponse) {
              aggregatedResponse = response[responseKey];
            } else {
              aggregatedResponse = aggregatedResponse.concat(response[responseKey]);
            }

            if (!(skip + limit <= response.count)) {
              _context7.next = 13;
              break;
            }

            return _context7.abrupt("return", getPagedData(url, config, responseKey, query = {}, skip + limit, limit, aggregatedResponse));

          case 13:
            return _context7.abrupt("return", aggregatedResponse);

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getPagedData(_x15, _x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

var getSyncData = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(url, config, query, responseKey) {
    var aggregatedResponse,
        response,
        _args8 = arguments;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            aggregatedResponse = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : null;
            _context8.next = 3;
            return fetchCsData(url, config, query);

          case 3:
            response = _context8.sent;

            if (!aggregatedResponse) {
              aggregatedResponse = {};
              aggregatedResponse.data = [];
              aggregatedResponse.data = response[responseKey];
              aggregatedResponse.sync_token = response.sync_token;
            } else {
              aggregatedResponse.data = aggregatedResponse.data || [];
              aggregatedResponse.data = aggregatedResponse.data.concat(response[responseKey]);
              aggregatedResponse.sync_token = response.sync_token ? response.sync_token : aggregatedResponse.sync_token;
            }

            if (!response.pagination_token) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", getSyncData(url, config, query = {
              pagination_token: response.pagination_token
            }, responseKey, aggregatedResponse));

          case 7:
            return _context8.abrupt("return", aggregatedResponse);

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getSyncData(_x18, _x19, _x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();