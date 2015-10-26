# dataQuery

```javascript

dataQuery( {
     name : "jonhnson"
   }, data);

  
```

















   

 


   
#### Class dataQuery


- [_initFunctionDelegates](README.md#dataQuery__initFunctionDelegates)
- [add](README.md#dataQuery_add)
- [assign](README.md#dataQuery_assign)
- [collectFromObject](README.md#dataQuery_collectFromObject)
- [extend](README.md#dataQuery_extend)
- [filter](README.md#dataQuery_filter)
- [forEach](README.md#dataQuery_forEach)
- [item](README.md#dataQuery_item)
- [map](README.md#dataQuery_map)
- [matches](README.md#dataQuery_matches)
- [reduce](README.md#dataQuery_reduce)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    





   
# Class dataQuery


The class has following internal singleton variables:
        
* _delegatesDone
        
        
### <a name="dataQuery__initFunctionDelegates"></a>dataQuery::_initFunctionDelegates(t)


```javascript
if(!_delegatesDone) {
    _delegatesDone = true;
    
    // functions which can be applied to each item separately...
    var fnList = ["set","unset", "remove","on", "at"];
    
    var me = this;
    
    fnList.forEach( function(fName) {
        _myTrait_[fName] = function() {
            var argList = Array.prototype.slice.call(arguments);
            me._items.forEach( function(item) {
                 try {
                    item[fName].apply( item, argList );
                 } catch(e) {
                     
                 }
            });
            return me;          
        }
    })
}
return this;
```

### <a name="dataQuery_add"></a>dataQuery::add(obj)
`obj` Item to add to collection
 


```javascript

this._items.push( obj );
```

### <a name="dataQuery_assign"></a>dataQuery::assign(obj, force)
`force` force update
 


```javascript

for( var n in obj ) {
    if(!obj.hasOwnProperty(n)) continue;
    var value = obj[n],
        me = this;
    this.forEach( function(item) {
        if(item.isObject && item.isObject()) {
            if(!item.hasOwn(n) || force) {
                item.set(n, value);
            }
        }
    });
}
```

### <a name="dataQuery_collectFromObject"></a>dataQuery::collectFromObject(filter)
`filter` Filter object to match
 


```javascript


if(this._rootObj) {
    var me = this;
    this._rootObj.forTree( function( obj ) {
        if(me.matches( filter, obj )) {
            me.add( obj );
        } 
    });
}
```

### <a name="dataQuery_extend"></a>dataQuery::extend(name, fn)


```javascript
if(this.isObject(name)) {
    
    for( var n in name ) {
        if(name.hasOwnProperty(n)) this.extend( n, name[n]);
    }
    
    return this;
}

if(!_myTrait_[name]) {
    _myTrait_[name] = fn;
}
return this;
```

### <a name="dataQuery_filter"></a>dataQuery::filter(fn)


```javascript
var res = dataQuery();
this.forEach( function(item) {
    if(fn(item)) res.add( item );
})
return res;
```

### <a name="dataQuery_forEach"></a>dataQuery::forEach(fn)
`fn` Function to call
 


```javascript
var me = this,
    i = 0;
me._items.forEach( function(item, i) {
     try {
        fn.apply( item, [item, i, me] );
     } catch(e) {
         
     }
});
return this;
```

### dataQuery::constructor( query, obj )

```javascript
if(!_delegatesDone) {
    this._initFunctionDelegates();
}
// query object or function...
this._items = [];

if(query) {
    
    if(this.isObject(query) && query._initFunctionDelegates) {
        var i=0;
        while(arguments[i]) {
            var qq = arguments[i];
            this._rootObj = qq._rootObj;
            this._items = this._items.concat(qq._items);
            i++;
        }
        return;
    }
    
    this._rootObj = obj;
    
    // the query...
    if(this.isObject(query)) {
         this.collectFromObject( query );
    }
}
```
        
### <a name="dataQuery_item"></a>dataQuery::item(index)


```javascript
return this._items[index];
```

### <a name="dataQuery_map"></a>dataQuery::map(fn)


```javascript
var res = dataQuery();
this.forEach( function(item) {
    var v = fn(item);
    if(v) {
        res.add( item );
    }
})
return res;
```

### <a name="dataQuery_matches"></a>dataQuery::matches(filter, dataObj)
`filter` filter object
 
`dataObj` _data object
 


```javascript

if(!dataObj) return false;
if(!this.isObject(dataObj)) return false;
if(this.isFunction(dataObj)) return false;

var b_match;
for( var n in filter ) {
    if(!filter.hasOwnProperty(n)) continue;
    var fV = filter[n];
    if(this.isFunction(fV)) {
        if(fV(dataObj[n])) {
           if(typeof(b_match) == "undefined") b_match = true; 
        } else {
            b_match = false;
        }
    } else {
        if(this.isObject(fV)) {
            b_match = this.matches( fV, dataObj[n]);
        } else {
            if(!dataObj.hasOwn(n)) return false;
            var val = dataObj.get(n);
            if(val==fV) {
                if(typeof(b_match) == "undefined") b_match = true; 
            } else {
                b_match = false;
            }
        }
    }
}

return b_match;
```

### <a name="dataQuery_reduce"></a>dataQuery::reduce(fn, initValue)


```javascript
var res = dataQuery(),
    currentValue = initValue;
    
this.forEach( function(item) {
    currentValue = fn(currentValue,item);
})

return currentValue;
```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript
return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return t instanceof Array;
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    




