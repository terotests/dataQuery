// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var dataQuery_prototype = function dataQuery_prototype() {
    // Then create the traits and subclasses for this class here...

    // trait comes here...

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * @param float t
       */
      _myTrait_.guid = function (t) {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      };

      /**
       * @param float t
       */
      _myTrait_.isArray = function (t) {
        return t instanceof Array;
      };

      /**
       * @param float fn
       */
      _myTrait_.isFunction = function (fn) {
        return Object.prototype.toString.call(fn) == "[object Function]";
      };

      /**
       * @param float t
       */
      _myTrait_.isObject = function (t) {
        return t === Object(t);
      };
    })(this);

    (function (_myTrait_) {
      var _delegatesDone;

      // Initialize static variables here...

      /**
       * @param float t
       */
      _myTrait_._initFunctionDelegates = function (t) {
        if (!_delegatesDone) {
          _delegatesDone = true;

          // functions which can be applied to each item separately...
          var fnList = ["set", "unset", "remove", "on", "at"];

          var me = this;

          fnList.forEach(function (fName) {
            _myTrait_[fName] = function () {
              var argList = Array.prototype.slice.call(arguments);
              me._items.forEach(function (item) {
                try {
                  item[fName].apply(item, argList);
                } catch (e) {}
              });
              return me;
            };
          });
        }
        return this;
      };

      /**
       * @param Object obj  - Item to add to collection
       */
      _myTrait_.add = function (obj) {

        this._items.push(obj);
      };

      /**
       * @param float obj
       * @param Boolean force  - force update
       */
      _myTrait_.assign = function (obj, force) {

        for (var n in obj) {
          if (!obj.hasOwnProperty(n)) continue;
          var value = obj[n],
              me = this;
          this.forEach(function (item) {
            if (item.isObject && item.isObject()) {
              if (!item.hasOwn(n) || force) {
                item.set(n, value);
              }
            }
          });
        }
      };

      /**
       * @param Object filter  - Filter object to match
       */
      _myTrait_.collectFromObject = function (filter) {

        if (this._rootObj) {
          var me = this;
          this._rootObj.forTree(function (obj) {
            if (me.matches(filter, obj)) {
              me.add(obj);
            }
          });
        }
      };

      /**
       * @param float name
       * @param float fn
       */
      _myTrait_.extend = function (name, fn) {
        if (this.isObject(name)) {

          for (var n in name) {
            if (name.hasOwnProperty(n)) this.extend(n, name[n]);
          }

          return this;
        }

        if (!_myTrait_[name]) {
          _myTrait_[name] = fn;
        }
        return this;
      };

      /**
       * @param float fn
       */
      _myTrait_.filter = function (fn) {
        var res = dataQuery();
        this.forEach(function (item) {
          if (fn(item)) res.add(item);
        });
        return res;
      };

      /**
       * @param Function fn  - Function to call
       */
      _myTrait_.forEach = function (fn) {
        var me = this,
            i = 0;
        me._items.forEach(function (item, i) {
          try {
            fn.apply(item, [item, i, me]);
          } catch (e) {}
        });
        return this;
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (query, obj) {
        if (!_delegatesDone) {
          this._initFunctionDelegates();
        }
        // query object or function...
        this._items = [];

        if (query) {

          if (this.isObject(query) && query._initFunctionDelegates) {
            var i = 0;
            while (arguments[i]) {
              var qq = arguments[i];
              this._rootObj = qq._rootObj;
              this._items = this._items.concat(qq._items);
              i++;
            }
            return;
          }

          this._rootObj = obj;

          // the query...
          if (this.isObject(query)) {
            this.collectFromObject(query);
          }
        }
      });

      /**
       * @param int index
       */
      _myTrait_.item = function (index) {
        return this._items[index];
      };

      /**
       * @param Function fn
       */
      _myTrait_.map = function (fn) {
        var res = dataQuery();
        this.forEach(function (item) {
          var v = fn(item);
          if (v) {
            res.add(item);
          }
        });
        return res;
      };

      /**
       * @param Object filter  - filter object
       * @param Object dataObj  - _data object
       */
      _myTrait_.matches = function (filter, dataObj) {

        if (!dataObj) return false;
        if (!this.isObject(dataObj)) return false;
        if (this.isFunction(dataObj)) return false;

        var b_match;
        for (var n in filter) {
          if (!filter.hasOwnProperty(n)) continue;
          var fV = filter[n];
          if (this.isFunction(fV)) {
            if (!dataObj.hasOwn(n)) return false;

            var vv;
            if (dataObj[n].isObject && dataObj[n].isObject()) {
              vv = dataObj[n];
            } else {
              vv = dataObj.get(n);
            }

            if (fV(vv)) {
              if (typeof b_match == "undefined") b_match = true;
            } else {
              b_match = false;
            }
          } else {
            if (this.isObject(fV)) {
              b_match = this.matches(fV, dataObj[n]);
            } else {
              if (!dataObj.hasOwn(n)) return false;
              var val = dataObj.get(n);
              if (val == fV) {
                if (typeof b_match == "undefined") b_match = true;
              } else {
                b_match = false;
              }
            }
          }
        }

        return b_match;
      };

      /**
       * @param float fn
       * @param float initValue
       */
      _myTrait_.reduce = function (fn, initValue) {
        var res = dataQuery(),
            currentValue = initValue;

        this.forEach(function (item) {
          currentValue = fn(currentValue, item);
        });

        return currentValue;
      };
    })(this);
  };

  var dataQuery = function dataQuery(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof dataQuery) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != dataQuery._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new dataQuery(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  dataQuery._classInfo = {
    name: "dataQuery"
  };
  dataQuery.prototype = new dataQuery_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["dataQuery"] = dataQuery;
      this.dataQuery = dataQuery;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["dataQuery"] = dataQuery;
    } else {
      this.dataQuery = dataQuery;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());