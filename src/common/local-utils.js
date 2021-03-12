
;
import axios from 'axios' ;
import qs from 'qs'
// import { setupCache } from 'axios-cache-adapter'





    /**
     * 将字符串中的{obj}进行替换
    */
function  replaceObject(s, name, val) {
    if (val == undefined || val == null)
        return s;

    if (typeof val == 'object') {
        for (let key in val) {
            if (val.hasOwnProperty(key)) {
                let v = val[key];
                let n = key;
                if (name)
                    n = name + '.' + key;

                s = replaceObject(s, n, v);
            }
        }

    } else {
        let reg = new RegExp("({" + name + "})", "g");
        return s.replace(reg, val);
    }

    return s;
}




 
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';



function init(){


        
    // Warn if overriding existing method
    if(Array.prototype.equals)
        console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");

    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time 
        if (this.length != array.length)
            return false;

        for (let i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;       
            }           
            else if (this[i] != array[i]) { 
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;   
            }           
        }       
        return true;
    };
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});


    // IE 不支持字符串的 startsWith
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }
    if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }

    if (typeof String.prototype.replaceAll != 'function') {
        String.prototype.replaceAll  = function(s1,s2){
            return this.replace(new RegExp(s1,"gm"),s2);
        };
    }




    if (typeof String.prototype.format !== 'function') {

        String.prototype.format = function(args) {
            let result = this;
            if (arguments.length > 0) {
                if (arguments.length == 1 && typeof(args) == "object") {
                    for (let key in args) {
                        if (args[key] != undefined) {
                            result = replaceObject(result, key, args[key]);
                            // let reg = new RegExp("({" + key + "})", "g");
                            // result = result.replace(reg, args[key]);
                        }
                    }
                } else {
                    for (let i = 0; i < arguments.length; i++) {
                        if (arguments[i] != undefined) {
                            let reg = new RegExp("({[" + i + "]})", "g");
                            result = result.replace(reg, arguments[i]);
                        }
                    }
                }
            }
            return result;
        };

    }

   Date.prototype.format = function(fmt) { //author: meizz
        let o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    if (typeof JSON.retrocycle !== "function") {
        JSON.retrocycle = function retrocycle($) {
            "use strict";


            let px = /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;

            (function rez(value) {

                // The rez function walks recursively through the object looking for $ref
                // properties. When it finds one that has a value that is a path, then it
                // replaces the $ref object with a reference to the value that is found by
                // the path.

                if (value && typeof value === "object") {
                    if (Array.isArray(value)) {
                        value.forEach(function(element, i) {
                            if (typeof element === "object" && element !== null) {
                                let path = element.$ref;
                                if (typeof path === "string" /*&& px.test(path)*/ ) {
                                    value[i] = eval(path);
                                } else {
                                    rez(element);
                                }
                            }
                        });
                    } else {
                        Object.keys(value).forEach(function(name) {
                            let item = value[name];
                            if (typeof item === "object" && item !== null) {
                                let path = item.$ref;
                                if (typeof path === "string" /*&& px.test(path)*/ ) {
                                    value[name] = eval(path);
                                } else {
                                    rez(item);
                                }
                            }
                        });
                    }
                }
            }($));
            return $;
        };
    }



}



init();
    
/////////////////////////////////////////////////////////


class RunOnce {
    constructor(){
        this.handle = null ; 
    } 

    run(fn, interval = 200 ){
        if (this.handle) {
            clearTimeout(this.handle);
        }
        this.handle = setTimeout(function() {
            fn();
        }, interval );
    }

    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class UtilClass{

    constructor(){
        this.hostCallback = null ; 
        this.uniques = {};
        
        this.options = {} ;
        let defaultOptions = window['defaultOptions'] || null ;
        if (defaultOptions) {
            this.options = this.merge( this.options , defaultOptions );
        }


        // VUE , REACT , NG 适配器
        this.adapter = null;
        
        
    } 


    createRunOnce(){
        return new RunOnce();
    }


    static joinUrl( first , second ){
        if( first.endsWith('/')) {
            if( second.startsWith('/')) {
                return first + second.substr(1);

            }else {
                return first + second ;
            }
        }else {
            if( second.startsWith('/')) {
                return first + second ;

            }else {
                return first + '/'+ second ;
            }
        }

    }


    uniqueArray( list1, list2 ){
        if( list1 && Array.isArray(list1)  ) {
            if( list2 && Array.isArray(list2) , list2.length > 0 ) {
            
                for( let i = 0 ; i< list2.length;i++){
                    let one = list2[i];
                    if(list1.indexOf( one )<0){
                        list1.push( one );
                    }
                }
                return list1;

            }
        }
    }

    changeHostCheck( callback ){
        let old = this.hostCallback ;
        this.hostCallback = callback;
        return old;
    }

    
    getHostByPath( url ){
        if( !url )
            return null;
        if( url.startsWith('http://') ||  url.startsWith('https://')  ) {
            return null;
        }
        if( this.hostCallback == null )
            return null;
        else {
            let host = this.hostCallback(url);
            return host; //  host + url ;
        }
    }


    hostReplace ( url ){
        if( !url )
            return null;
            
        if( url.startsWith('http://') ||  url.startsWith('https://')  ) {
            return url;
        }
        if( this.hostCallback == null )
            return url;
        else {
            let host = this.hostCallback(url);
            if(!host)
                return url;
            else 
                return UtilClass.joinUrl(host,url); //  host + url ;
        }
    }

    /*
        将String类型解析为Date类型.
           parseDate(' 2006-1-1 15:14:16.254 ') return new Date(2006,0,1,15,14,16,254)
           parseDate('不正确的格式') retrun null
    */
    parseDate(str) {
        if (typeof str == 'string') {
            // let results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
            // if(results && results.length>3)
            // return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]));
            // results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
            // if(results && results.length>6)
            // return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]));
            // results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
            // if(results && results.length>7)
            // return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]),parseInt(results[7]));

            let results = str.match(/^ *(\d{4})-(\d{2})-(\d{2}) +(\d{2}):(\d{2}):(\d{2})\.(\d{3}) *$/);
            if (results && results.length > 7)
                return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]),
                    parseInt(results[4]), parseInt(results[5]), parseInt(results[6]), parseInt(results[7]));
        }
        return null;
    }


    attachAdapter( adapter ) {
        this.adapter = adapter ;
    }
    
    externalResultFilter(status , responseText ){
        if( this.adapter != null && this.adapter.httpStatusFilter ) {
            return this.adapter.httpStatusFilter( status, responseText);
        }
    }

    getUniqueNumber(name){
        let u = this.uniques[name] ;
        if( u == undefined ) {
            u = this.uniques[name] = 0;
        }
        let val = u+1;
        this.uniques[name] = val;
        return val;
    }

    /**
     * Merge the given options into the default options.
     *
     * @param {Object} options
     */
     merge ( defaults , options, opt2 ) {
        // Object.assign(defaults, options)
        // IE 不支持 ASSIGN
        let obj3 = {};

        obj3 = this.copy(obj3, defaults) ;
        obj3 = this.copy(obj3, options) ;
        obj3 = this.copy(obj3, opt2) ;


        return obj3;

    } 


    

        
    static ___find(list, f) {
        return list.filter(f)[0]
    }
        
    
    copyOne(obj, _cache) {
        let that = this;
        if (_cache === void 0) 
                _cache = [];

        // just return if obj is immutable value
        if (obj === null || typeof obj !== 'object') {
                return obj;
        }


        // if obj is hit, it is in circular structure
        let hit = UtilClass.___find(_cache, function(c) { return c.original === obj });
        if (hit) {
            return hit.copy;
        }

        let _copy = Array.isArray(obj) ? [] : {} ;
        // put the copy into cache at first
        // because we want to refer it in recursive deepCopy
        _cache.push({
            original: obj,
            copy: _copy
        });

        Object.keys(obj).forEach(function(key) {
            _copy[key] = that.copyOne(obj[key], _cache);
        });

        return _copy;
    }

    
    copy( to, from ) {
        to = to || {} ;
        if(!from)
            return to;

        for (let name in from) {
            let val = from[name] ;
            to[name] = this.copyOne(val);
        }

        return to;
    }

        
    /**
     * 在 Vue 中，不允许 直接赋值 array 对象， 所以只好先复制一个新对象 backup
     * 然后操作，
     *
     * @param  {[type]}   array [description]
     * @param  {Function} fn    [description]
     * @return {[type]}         [description]
     */
    safeCopyArray( array , fn  ){
        if(!array )
            return;
        if( !Array.isArray(array))
            return;
        if( array.length == 0 )
            return ;

        if( !fn || typeof fn !== 'function' )
            return;


        let backup = this.copyOne(array);

        array.splice(0, array.length);

        backup = backup.filter( fn ) ;

        for (let i = 0; i < backup.length; i++) {
            array.push(backup[i]);
        }
    }
        
    
    wrapperJavascriptObject( text  ){
        if( !text )
            return text;

        try{
            let local = text.trim();
            if( local.startsWith('function') || local.startsWith('{')  || local.startsWith('[') ) {
                try{
                    let obj = eval('(function() { return ' + local + '}())');
                    let type = typeof obj ;
                    if( type === 'function')
                        return obj();
                    return obj;

                }catch(e){
                    console.log('eval error' , local, e);
                    return e;
                }
            }else {
                return text ;
            }


        }catch(e){
            console.log('wrapper function ',e, text );
            return null;
        }
    }



    // 对比两个数组 是否一致 
    compareArray(array1 , array2 , compare){
        if( ( array1 === null || array1 === undefined ) && ( array2 === null || array2 === undefined ))
            return true;
        if( ( array1 === null || array1 === undefined ) ||  ( array2 === null || array2 === undefined ) )
            return false;

        if( compare == undefined )   {
            compare = function( a, b) {
                return a == b ;
            }
        }         
            
        
        if( array1.length !== array2.length ) return false; 
        
        return array1.every( (value, index) => {
            let fz = array2.find( e=> compare(e , value) ) ;
            return fz !== undefined;
            
        });
    }

    timestamp(){
        return new Date().format('yyyyMMddhhmmss');
    } 


  



    toString(s){
        if(!s)
            return s;

        let st = typeof s ;
        if( st === 'string')
            return s;

        return JSON.stringify(s);
    }

    toObject( input , defaultObject ){

        let offset = null;
        if ( input == undefined || input === null || input === '')
            return defaultObject;

        let type =    typeof input ;
        if( type  ==='object') {
            return this.merge( defaultObject , input) ;
        }else if(type ==='string') {
            try{
                let obj =   JSON.parse(input)  ;
                obj = this.merge( defaultObject , obj) ;
                return obj;
            }catch(e){
                console.log( 'Parse json error : ', input,  e);
                return null;
            }

        }else
            return input;


    }

    formatDate( input, format ) {
        let date = parseDate( input);
        if(date!=null){
            return date.format(format);
        }
        return input;
    }
    
    
    isInvalid (val) {
        return val == undefined || val == null;
    } 



    tick(){
        return new Date().getTime();
    }

    rand (size1, map1) {
        let map = map1 || ALPHABET;
        let length = map.length;
        let size = size1 || 16;

        let d = new Date().getTime();
        let s = '';
        for (let i = 0; i < size; i++) {
            let r = (d + Math.random() * length) % length | 0;
            d = Math.floor(d / 16);
            let c = map.charAt(r);
            s += c;
        }


        return s;

    }    




    /**
     * append name and value to _url ,
     * if value is array , then  _url += name = value[1] & name= value[2]
     * if value is string split with ,
     * if value is single string _url += name = value ;
     * @param  {[type]} _url  [description]
     * @param  {[type]} name  [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    appendUrl (_url, name, value) {

        if( !_url )
            return _url ;

        if (_url.indexOf('?') < 0)
            _url = _url + '?';


        if (name && value != undefined && value != null) {

            if (Array.isArray(value)) {

                for (let i = 0; i < value.length; i++) {
                    if (value[i])
                        _url += '&' + name + '=' + encodeURIComponent(value[i]);
                }

            } else if ( value instanceof Set) {

                for (let o of value ) {
                    if (o)
                        _url += '&' + name + '=' + encodeURIComponent(o);
                }

            } else if (typeof value == 'string') {
                    let _vals = value.split(',');
                    if (_vals) {
                        for (let i = 0; i < _vals.length; i++) {
                            if (!this.isInvalid(_vals[i]))
                                _url += '&' + name + '=' + encodeURIComponent(_vals[i]);
                        }
                    }
            } else {
                _url += '&' + name + '=' + encodeURIComponent(value);

            }
        }
        return _url;
    }     


    /**
     * 
     * @param {回调函数，如果返回true，那么循环结束，否则 sleep interval 毫秒 } test 
     * @param {*} interval 
     */
    until2( test , interval=50 ){
        
        if( !test ) return false;
        if( typeof test !== 'function') return false;

        // let ret = test();
        // if(ret === true)
        //     return ;

        let handle = null ;
        handle = setInterval( ()=> {
            let ret = test();
            if(ret === true ){
                if(handle)
                    clearInterval(handle);
                handle = null ;
                return true; 
            }

        }, interval );

     
            
    }
    

    async until( test , interval=50 ){
        
        if( !test ) return false;
        if( typeof test !== 'function') return false;
        
        while(true){
            let ret = test();
            if(ret){
                return true;
                
            }else {
                await Utils.sleep(interval);
            }
        } 

            
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    appendUrlComponent (_url, name, value) {
        if (name && value != undefined && value != null) {
            _url += '&' + name + '=' + encodeURIComponent(value);
        }
        return _url;
    }


    /**
     * 替换 url 中被 `{}` 包含的变量， 例如 url= 'http://aabb/{val1}/test_{val2} 
     * {val1} 会被 params.val1 的值替换， 如果
     * @param {替} url 
     * @param {*} params 
     */
    replaceUrl(url, params) {
        let regex = /\{\w+\}/g;
        let m;
        
        while ((m = regex.exec(url)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            let fx = m[0];
            if (fx) {
                let name = fx.substring(1, fx.length - 1);
                let val =  params ? params[name] : null ;

                if (val) {
                    if (Utils.isString(val)) {
                        if (val.startsWith('#now')) {
                            val = Utils.time(val.substring(1));
                        }
                    }
                }
                if (val) {
                    url = url.replace(fx, val);
                }
            }
        }
        return url;
    }

    appendObject( url, urlParams ){

        for (let key in urlParams) {
            if (urlParams.hasOwnProperty(key)) {
                let val = urlParams[key];
                url = this.appendUrl(url, key, val);
            }
        }
        return url;
    }
    /**
     * url 参数 替换
     *
     * @param  {[type]} url        [description]
     * @param  {[type]} params     [description]
     * @param  {[type]} pathParams [description]
     * @return {[type]}            [description]
     */
    appendParams (url, params, pathParams) {

        //
        if (!pathParams)
            pathParams = params || {};

        url = this.replaceUrl(url, pathParams);

        // 来自额外的参数
        if (params) {

            if (url.indexOf('?') < 0)
                url = url + '?';

            for (let key in params) {
                if (params.hasOwnProperty(key)) {
                    let val = params[key];
                    url = this.appendUrl(url, key, val);
                }
            }
        }

        return url;

    }


    fullUrl(url){
        return  this.hostReplace(url);
    }




 

 

    static checkResult( response , errorf ){
        if( response.status != 200 ){
            if(errorf)
            {
                errorf( response.statusText  , response.config.url );
            }else
                throw new Error( response.statusText + " " + response.config.url );

            return ;
        }

        return response.data;
 
    }

    getAdapterSessionValue(name){

        if( this.adapter != null && this.adapter.getValue ) {
            let val = this.adapter.getValue( name );
            return val;
        }
        return undefined;
    }

    ajax (opts, successf, errorf) {

        let url ;
        let that = this;
        url = this.hostReplace(opts.url);
    // type: opts.type || 'get',
    //         url:  url,
    //         contentType : opts.contentType ,
    //         data: opts.data,
    //         dataType: opts.dataType || "JSON",
    //         cache : opts.cache ,
    //         processData : opts.processData ,
    //         xhr: progress ,
    //         timeout: opts.timeout || 30000,

        let method = (opts.type || 'GET').toLowerCase();
        let token = null ;
        // let session = getSession();
        if(  opts.notoken !== true ){

            let sessionValue = this.getAdapterSessionValue('session');
            if( opts.appKey){
                token = opts.appKey;

            }else if( !this.options.disableToken && sessionValue ){
                token = sessionValue  ;
            }else {
                token = window['EXTTOKEN'];
            }
        }

        let headers = {} ;
        if(token){
            headers.TOKEN = token ;
        }
        let data = opts.data || {} ;
        if( opts.contentType ){
            headers['Content-Type'] = opts.contentType;
        }else {

            // 如果没有设置 type ，那么根据输入参数 设置默认的 
            if( data instanceof FormData ) {
                headers['Content-Type'] = 'multipart/form-data';
            }else {
                if( method == 'post' || method == 'put') {
                    headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }
            }
            
        }

        
        if( headers['Content-Type'] == 'application/x-www-form-urlencoded') {
            data = qs.stringify(data);
        }else if( headers['Content-Type'] == 'multipart/form-data') {
            if( data instanceof FormData ) {

            }else {
                data = new FormData();
                Object.keys(opts.data).forEach(function(name) {
                    let item = opts.data[name];
                    if( name && item )
                        data.append(name,item); 
                });
            }
            
        }else {

        }

        if( !this.ajaxApi ) {
            
            // Create `axios-cache-adapter` instance
            // const cache = setupCache({
            // maxAge: 15 * 60 * 1000
            // })


            this.ajaxApi =  axios.create({
                // adapter: cache.adapter
            });
        }
     
        this.ajaxApi({ 
            method ,
            url:  url  , 
            data : data ,
            headers,  
            timeout : opts.timeout || 30000,
           
        })
 //     axios.get(url)
            .then(function (response) {
            
                let resp =  UtilClass.checkResult(response , errorf ); 
                if( resp ){
                    resp = JSON.retrocycle(resp);
                    try{
                        successf(resp); 
                    }catch(e){
                        console.error( e );
                    }
                    
                }
                // 

                // let resp = response.data ; 
                

            })
            .catch(function (error) {
                let xhr = error.request  ;
                if( xhr == undefined && !errorf ) {
                    // 不是 AJAX 的网络异常， 
                    // console.log(error.message); 
                    console.error(error);
                    return ;
                }

                if( that.externalResultFilter( xhr.status, xhr.responseText ) === true ){
                    return ;
                }

                if (xhr.readyState == 4) {
                    // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                    console.log(["readyState is 4  " ,  opts.url, xhr.status ,  error.message ]);
                }
                else if (xhr.readyState == 0) {
                    // Network error (i.e. connection refused, access denied due to CORS, etc.)
                    console.log(["readyState is 0 , refused, access denied , "  ,  opts.url, xhr.status ,  error.message ]);
                }
                else {
                     console.log(["readyState is " + xhr.readyState+"  , something weird is happening ,   "  ,  opts.url, xhr.status ,  error.message ]);
                }

                if( errorf ) {
                    errorf( xhr, xhr.status, error , error.message );
                }else {
                    if( successf ) {
                        let resp ;
                        if( xhr.status == 403 ) {
                            resp = {
                                status :   xhr.status  ,
                                message :  ' 403 Forbidden , ' + xhr.responseText 
                            };
                        }else {
                            resp = {
                                status :   xhr.status || -1 ,
                                message :  ' ' + ( error.message || ' readyState is 0 , connect refused or access denied! ' )  + '  ' + url
                            };
                        }
                        
                        successf( resp );
                    }
                }

 
            });

    } 

    

        


    // 将一个对象转换为 数组
    propsToArray (objs, name, value) {
        if (!objs)
            return [];
        let output = [];
        let _name = name || 'name';
        let _value = value || 'value';
        for (let index in objs) {
            if (objs.hasOwnProperty(index)) {
                let val = objs[index];
                let obj = {};
                obj[_name] = index;
                obj[_value] = val;
                output.push(obj);
            }
        }
        return output;

    } 

    // 按照 key 排序
    sortByKey (objs, name, reverse=false) {
        if (!objs)
            return [];

        if (!Array.isArray(objs))
            return null;


        let _name = name || 'value';

        let list1 = objs.sort(function(one, two) {
            let v1 = one[_name];
            let v2 = two[_name];


            if( !reverse ){
                if (v1 == undefined || v1 == null) {
                    v1 = Number.MIN_VALUE;
                }
                if (v2 == undefined || v2 == null) {
                    v2 = Number.MIN_VALUE;
                }

                if (v1 > v2)
                    return -1;
                else if (v1 < v2)
                    return 1;
                else
                    return 0;
            }else {
                if (v1 == undefined || v1 == null) {
                    v1 = Number.MIN_VALUE;
                }
                if (v2 == undefined || v2 == null) {
                    v2 = Number.MIN_VALUE;
                }

                if (v1 > v2)
                    return 1;
                else if (v1 < v2)
                    return -1;
                else
                    return 0;
            }

            

        });

        return list1;

    } 
 
}

const Utils = new UtilClass();
/**
 *
 */
export default Utils;
