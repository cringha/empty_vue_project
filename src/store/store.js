import Vue from 'vue';
import Vuex from 'vuex';
import StorageFactory from './storage' 
import User from './user.png'
Vue.use(Vuex);

 

const MAX_MESSAGES  = 100 ;
let storage = new StorageFactory();
    

function merge ( defaults , options) {
  // Object.assign(defaults, options)
  // IE 不支持 ASSIGN

    let obj3 = {};
    for (let attrname in defaults) { obj3[attrname] = defaults[attrname]; }
    for (let attrname in options) { obj3[attrname] = options[attrname]; }
    return obj3;

}

 


const NAME_MESSAGES = 'messages';
const NAME_HOSTS = 'hosts';
const NAME_DATA = 'data';
const NAME_AUTH = 'auth';

const MOCK_USER = {
    account: 'EE-ADMIN',
    id: 1,
    name: 'Easy Edge Admin',
    props: {
      
    },
    avatar : User ,    
    token:
        "RxVWNAAAWwAgAAR0ZXN0AAR6ZG1pAA4yMDE4MDYyNTA4NTkzOAAAALQAAgAXY2xpZW50QWRkcjoxMC42MC4xNjQuNTkAHnVzZXJBZ2VudDpQb3N0bWFuUnVudGltZS83LjEuMUnOV4lQSoJ0VhhPxA_6MExVuFnUOcpOQrNClozifCJg",
    type: "USER",
};
 

const store = new Vuex.Store({
    state: {
    
        persistentData  : storage.getData(NAME_DATA ,  {})  ,

        messages : storage.getData( NAME_MESSAGES , [])  ,

        hosts :    storage.getData( NAME_HOSTS  , {}) ,

        auth :  MOCK_USER , 
   
        caches : {} ,

       
    },

    getters: {


        
        caches: state => {
            return state.caches || {} ;
        },
          
        persistentData: state => {
            return state.persistentData || {} ;
        },
   
        messages: state => {
            return state.messages || [];
        },

 
        hosts: state => {
            if( state.hosts )
                return state.hosts;
            return  {}  ;
        },

        auth : state => {
            if (state && state.auth  )
                return state.auth;
            return {} ;
        },

        avatar: state => {
            if (state && state.auth && state.auth.avatar )
                return state.auth.avatar;
            return '' ;
        },

        sid: state => {
            if( !state.auth )
                return undefined;
            
            return state.auth.account + ":"+ state.__login;
        },

        account: state => {
            if( state.auth )
                return state.auth.account ;
                
            return state.persistentData.account ;
            
        },
        id: state => {
            if (state && state.auth && state.auth.id)
                return state.auth.id;
            return null;
        },
     
     

        authenticated: state => {
            if (state && state.auth && state.auth.account )
                return true;
            return false;
        },

        name: state => {
            if (state.auth)
                return state.auth.name;
            return '';
        },
 
        roles: state => {
            if (state && state.auth && state.auth.roles  )
                return state.auth.roles  ;
            return  {};
        },
       
    },

    mutations: {

        caches( state , keypair ){
            if( !state.caches )
                state.caches = {} ;
            if( !keypair )
                return ;

            let {name, value } = keypair ;
            if( !name )
                return ;

            state.caches[name] = value  ; 

        },
        persistentData( state , keypair ){
            if( !state.persistentData )
                state.persistentData = {} ;
            if( !keypair )
                return ;

            let {name, value } = keypair ;
            if( !name )
                return ;

            state.persistentData[name] = value  ; 
            storage.saveData( NAME_DATA , state.persistentData );
        },
        
   

        clearmessage( state , val ){
            state.messages = []; 
            storage.saveData( NAME_MESSAGES , [] );
        },

        message( state , val ){
            if( !state.messages )
                state.messages = [];

            state.messages.push(val);
            if(state.messages.length > MAX_MESSAGES )
            {
                state.messages.shift();
            }
            storage.saveData( NAME_MESSAGES , state.messages );
             
        },
 
        hosts(state, hosts) {
            state.hosts = hosts ;  
            storage.saveData( NAME_HOSTS , state.hosts );
        },


        update( state, user ){
            if (user) {
                if(state.auth)
                    state.auth.name = user.name ;
            } 
        },

        auth(state, input ) {
            // debugger;
            if (input) {

                let at = input.auth ;
      
 
                let cache = merge( {} , at );
                cache.roles = { } ;
          
                // cache.roles =   mergeRoles(  Settings.DEFAULT_USER_ROLES  , cache.roles );
                storage.saveData(NAME_AUTH, cache);
                state.auth = cache;
                if(! state.persistentData )
                    state.persistentData = {} ;

                state.persistentData['account'] = cache.account  ;
       
                if( state.__login === undefined )
                    state.__login = 1 ;
                else {
                    state.__login ++  ;
                }


            } else {
                // clear session 
                state.auth = null;
                storage.saveData(NAME_AUTH);
            }


        },
    },

    actions: {
        
        persistentData( { commit, state }, at ){
            commit('persistentData', at  );
        },


        caches( { commit, state }, at ){
            commit('caches', at  );
        },
       
        messages ( { commit, state }, message ){
            if( message != null )
                commit('message', message );
            else
                commit('clearmessage', message );
        },


        updateUser ( { commit, state }, at ){
            commit('update', at );
        },

        hosts ({ commit, state }, hosts) {
            commit('hosts', hosts );
        },

        login({ commit, state }, at) {
            // debugger;
            commit('auth', at );
            if (at.inst && at.inst.$router) {
                let target = at.target ;

                if(target){
                    target = target.replaceAll('_','/')
                }else if( target == undefined ) {
                    target=  '/'  ;
                }else {

                }

                if(target)
                    at.inst.$router.push({ path: target });
            }
        },

        logout({ commit, state }, at) {
            // debugger;
            commit('auth', null);

            if (at.inst && at.inst.$router) {
                // 如果登陆成功，则跳转到 ... 
                at.inst.$router.push({ path: '/login' });
            }
        },


    },


});


 
export default store;