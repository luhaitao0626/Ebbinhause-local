// indexedDB.js，浏览器本地数据库操作

export default {
  //basic params
  dbName: "Ebbinhause",
  storeName: "records",
  dbVersion: 1,
  key: "time",

  // indexedDB兼容
  indexedDB:
    window.indexedDB ||
    window.webkitindexedDB ||
    window.msIndexedDB ||
    window.mozIndexedDB,
  // 打开数据库
  // 新对象储存空间newStore参数：newStore.name、newStore.key
  // 新增对象存储空间要更改数据库版本
  openDB: function(dbname, version, db, newStore) {
    return new Promise((resolve, reject) => {
      version = version || 1;
      var request = this.indexedDB.open(dbname, version);

      request.onsuccess = function(event) {
        db = event.target.result;
        resolve(db);
      };
      // onupgradeneeded，调用创建新的储存空间
      request.onupgradeneeded = function(event) {
        var db = event.target.result;
        if (newStore) {
          if (!db.objectStoreNames.contains(newStore.name)) {
            db.createObjectStore(newStore.name, {
              keyPath: newStore.key,
              // autoIncrement: true
            });
          }
        }
      };

      request.onerror = function() {
        reject("IndexedDB数据库打开错误");
        // console.log("IndexedDB数据库打开错误");
      };
    });
  },
  // 通过key获取数据
  getData: function(db, storename, key) {
    return new Promise((resolve, reject) => {
      var store = db.transaction(storename, "readonly").objectStore(storename),
        request;
      //   console.log(key);
      if (key != "") {
        request = store.get(key);
      } else {
        request = store.getAll();
      }
      request.onerror = function() {
        reject("通过KEY获取数据报错");
      };
      request.onsuccess = function(event) {
        // 将查询结果传入回调函数
        resolve(event.target.result);
      };
    });
  },
  // 删除数据库
  deleteDB: function(dbname, callback) {
    var deleteQuest = this.indexedDB.deleteDatabase(dbname);
    deleteQuest.onerror = function() {
      console.log("删除数据库出错");
    };
    deleteQuest.onsuccess = function() {
      if (callback && typeof callback === "function") {
        callback();
      }
    };
  },
  // 关闭数据库
  closeDB: function(dbname) {
    dbname.close();
    console.log("数据库已关闭");
  },
  // 添加数据，add添加新值
  addData: function(db, storename, dataArr) {
    return new Promise((resolve, reject) => {
      let store = db.transaction(storename, "readwrite").objectStore(storename),
        request;
      for (var i = 0, len = dataArr.length; i < len; i++) {
        request = store.add(dataArr[i]);
        request.onerror = function() {
          reject("ADD添加数据报错");
        };
        request.onsuccess = function() {
          resolve();
        };
      }
    });
  },
  // 更新旧值
  putData: function(db, storename, dataArr) {
    return new Promise((resolve, reject) => {
      var store = db.transaction(storename, "readwrite").objectStore(storename),
        request;
      for (var i = 0, len = dataArr.length; i < len; i++) {
        request = store.put(dataArr[i]);
        request.onerror = function() {
          reject("PUT添加数据报错");
        };
        request.onsuccess = function() {
          resolve("数据初始化成功");
        };
      }
    });
  },
  // 删除数据
  deleteData: function(db, storename, key) {
    var store = db.transaction(storename, "readwrite").objectStore(storename);
    store.delete(key);
  },
  // 清空数据
  clearData: function(db, storename) {
    var store = db.transaction(storename, "readwrite").objectStore(storename);
    store.clear();
  },
  
  // 通过游标操作数据, callback中要有游标移动方式
  handleDataByCursor: function(db, storename, callback, keyRange) {
    keyRange = keyRange || "";
    var store = db.transaction(storename, "readwrite").objectStore(storename),
      request;
    request = store.openCursor(keyRange);
    request.onerror = function() {
      console.log("通过游标获取数据报错");
    };
    request.onsuccess = function(event) {
      var cursor = event.target.result;
      // 操作cursor的方法有cursor.update(value)、cursor.delete()
      if (cursor) {
        if (callback && typeof callback === "function") {
          // 将查询结果传入回调函数
          callback(cursor);
        }
        // 移动游标方式
        // cursor.continue();
      }
    };
  },
  // 通过索引游标操作数据, callback中要有游标移动方式
  handleDataByIndex: function(db, storename, cursorIndex, callback, keyRange) {
    keyRange = keyRange || "";
    var store = db.transaction(storename, "readwrite").objectStore(storename),
      request;
    request = store.index(cursorIndex).openCursor(keyRange);
    request.onerror = function() {
      console.log("通过索引游标获取数据报错");
    };
    request.onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        if (callback && typeof callback === "function") {
          // 将查询结果传入回调函数
          callback(cursor);
        }
        // 移动游标方式
        // cursor.continue();
      }
    };
  },
  // 创建游标索引
  createCursorIndex: function(db, storename, cursorIndex, callback) {
    var store = db.transaction(storename, "readwrite").objectStore(storename);
    store.createIndex(cursorIndex, cursorIndex, {
      unique: false,
    });
    if (callback && typeof callback === "function") {
      // 将查询结果传入回调函数
      callback();
    }
  },
};
