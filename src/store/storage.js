 

function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}




class StorageFactory  {

    constructor(  type ){
        type = type || 'Local';
        this.storage = null;
        if (type === 'Local') {
            assert(window.localStorage, "This browser not support LocalStorage!");
            this.storage = window.localStorage;
        } else {
            assert(window.sessionStorage, "This browser not support sessionStorage!");
            this.storage = window.sessionStorage;
        }
    } 

    



    clear () {
        if (this.storage) {
            this.storage.clear();
        }
    }

    // .enumStorage = function (callback) {
    //     if (storage) {


    //         for (var i = 0, len = storage.length; i < len; i++) {
    //             var key = storage.key(i);
    //             var value = storage.getItem(key);
    //             value = JSON.parse(value);
    //             if (this.namespace) {
    //                 if (key.startWith(this.namespace)) {
    //                     key = key.substring(this.len);
    //                 }
    //                 callback(key, value);
    //             } else {
    //                 callback(key, value);
    //             }
    //         }
    //     }
    // }


    _loadRaw( keyName) {
        let storage = this.storage;
        if (storage) {
            let lname = keyName;
            let json = storage.getItem(lname);
            if (json) {
                try {
                    let local = JSON.parse(json);
                    return local;
                } catch (e) {
                    console.log(e);
                    return json;
                }
            }
        }
        return null;
    }

    // 本地存储加载数据
    load (keyName) {

        let val = this._loadRaw( keyName);
        if (val && typeof val == 'object') {
            return val.content;
        }
        return val;
    }


    _saveRaw(  keyName, value) {
        if (storage) {

            let lname = keyName;
           

            let json = value;
            let type = typeof value;
            if (type == 'object')
                json = JSON.stringify(value);

            this.storage.setItem(lname, json);
            return true;

        } else {
            return false;
        }


    }
    // 本地存储加载数据
    save (keyName, value) {

        let val = this._loadRaw( keyName );
        if (!val) {
            val = {
                version: 0,
                time: new Date().getTime(),
                content: value
            };
        } else {
            if (val.version != undefined && val.version != null && typeof val.version === 'number') {

                val.version = val.version + 1;
            } else {
                val.version = 1;
            }

            val.time = new Date().getTime();
            val.content = value;
        }

        return this._saveRaw(keyName, val);

    }

    getData(name , defaultValue = undefined){
        let val =  this.load(name);
        if(val === null )
            return defaultValue;
        return val;
    }

    saveData(name, value ){
        this.save(name, value );
    }


}


 
export default StorageFactory;
 