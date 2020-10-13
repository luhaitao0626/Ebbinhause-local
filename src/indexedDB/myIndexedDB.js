let dbObj = {};

dbObj.init = function( param , callback ) {
  this.dbName = param.dbName;
  this.dbVersion = param.dbVersion;
  this.storeName = param.dbStoreName;
  if(!window.indexedDB) {
    alert("indexedDB is not supported by your browser!")
  }
  let request = indexedDB.open( this.dbName, this.dbVersion);
  request.onerror = function( e ) {
    console.log("数据库打开失败，错误码: ",e )
  } 
  request.onsuccess = function () {
    dbObj.db = event.target.result;
    console.log("数据库连接成功");
    callback()
  }
  request.onupgradeneeded = function( e ){
    dbObj.db = e.target.result;
    let optionalParameters = {
      keyPath: "time",
      autoIncrement: false
    }
    let store = dbObj.db.createObjectStore(dbObj.storeName,optionalParameters);
    alert("对象仓库创建成功！")
    let name = "timeIndex",
        keyPath = "time",
        optionalParametersForIndex = {
          unique:true,
          multiEntry: false
        };
    let idx = store.createIndex( name, keyPath, optionalParametersForIndex);
    console.log("idx",idx)
    alert("创建索引成功")
  }
}

dbObj.getStore = function( dbStoreName, mode ) {
  let ts = dbObj.db.transaction( dbStoreName, mode );
  return ts.objectStore(dbStoreName);
}

dbObj.add = function( msg ){
  let store = this.getStore( dbObj.storeName, "readwrite" )
  let request = store.add( msg );
  request.onsuccess = function() {
      console.log("添加成功")
  }
  request.onerror = function (e) {
    console.log(e)
  }
}


dbObj.put = function( msg ){
  let store = this.getStore( dbObj.storeName, "readwrite" )
  let request = store.put( msg );
  request.onsuccess = function() {
    // if(key) console.log("修改成功");
    console.log("添加成功")
  }
  request.onerror = function (e) {
    console.log(e)
  }
}

dbObj.delete = function (id) {
  let store = this.getStore(dbObj.storeName, "readwrite");
  let request = store.delete(id);
  request.onsuccess = function() {
    alert("删除成功")
  }
}

dbObj.select = function(key,callback) {
  let store = this.getStore( dbObj.storeName, "readwrite"),
      request;

  if(key)
    request = store.get(key);
  else
    request = store.getAll();
    request.onsuccess = function() {
      // console.log(request.result);
      callback(request.result)
    }
}

dbObj.clear = function() {
  let store = this.getStore( dbObj.storeName, "readwrite")
  let request = store.clear();
  request.onsuccess = function() {
    alert("清除成功")
  }
}

export default dbObj;