(function(){var t={},n=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return t instanceof Array},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var n;t._initFunctionDelegates=function(){if(!n){n=!0;var i=["set","unset","remove","on","at"],e=this;i.forEach(function(n){t[n]=function(){var t=Array.prototype.slice.call(arguments);return e._items.forEach(function(i){try{i[n].apply(i,t)}catch(e){}}),e}})}return this},t.add=function(t){this._items.push(t)},t.assign=function(t,n){for(var i in t)if(t.hasOwnProperty(i)){var e=t[i];this.forEach(function(t){t.isObject&&t.isObject()&&(!t.hasOwn(i)||n)&&t.set(i,e)})}},t.collectFromObject=function(t){if(this._rootObj){var n=this;this._rootObj.forTree(function(i){n.matches(t,i)&&n.add(i)})}},t.extend=function(n,i){if(this.isObject(n)){for(var e in n)n.hasOwnProperty(e)&&this.extend(e,n[e]);return this}return t[n]||(t[n]=i),this},t.filter=function(t){var n=i();return this.forEach(function(i){t(i)&&n.add(i)}),n},t.forEach=function(t){var n=this;return n._items.forEach(function(i,e){try{t.apply(i,[i,e,n])}catch(r){}}),this},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,i){if(n||this._initFunctionDelegates(),this._items=[],t){if(this.isObject(t)&&t._initFunctionDelegates){for(var e=0;arguments[e];){var r=arguments[e];this._rootObj=r._rootObj,this._items=this._items.concat(r._items),e++}return}this._rootObj=i,this.isObject(t)&&this.collectFromObject(t)}}),t.item=function(t){return this._items[t]},t.map=function(t){var n=i();return this.forEach(function(i){var e=t(i);e&&n.add(i)}),n},t.matches=function(t,n){if(!n)return!1;if(!this.isObject(n))return!1;if(this.isFunction(n))return!1;var i;for(var e in t)if(t.hasOwnProperty(e)){var r=t[e];if(this.isFunction(r)){if(!n.hasOwn(e))return!1;r(n[e])?"undefined"==typeof i&&(i=!0):i=!1}else if(this.isObject(r))i=this.matches(r,n[e]);else{if(!n.hasOwn(e))return!1;var o=n.get(e);o==r?"undefined"==typeof i&&(i=!0):i=!1}}return i},t.reduce=function(t,n){var e=(i(),n);return this.forEach(function(n){e=t(e,n)}),e}}(this)},i=function(t,n,e,r,o,a,s,u){var f,c=this;if(!(c instanceof i))return new i(t,n,e,r,o,a,s,u);var h=[t,n,e,r,o,a,s,u];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){f=t.apply(c,h)}),"function"==typeof f){if(f._classInfo.name!=i._classInfo.name)return new f(t,n,e,r,o,a,s,u)}else if(f)return f;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,h)}):"function"==typeof c.init&&c.init.apply(c,h)};i._classInfo={name:"dataQuery"},i.prototype=new n,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.dataQuery=i,this.dataQuery=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.dataQuery=i:this.dataQuery=i}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());