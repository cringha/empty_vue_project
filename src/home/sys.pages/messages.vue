<template>
    <div style="height:100%; width:100%">
        <a-list size="small" bordered :dataSource="messages" style="width:100%">
            <a-list-item slot="renderItem" slot-scope="item, index">  {{  toZTC(item.time) }} - {{  item.message }} </a-list-item>
         
        </a-list>
        <div style="position: fixed;  bottom: 40px; right: 10px;">
        
            <a-button @click="clearMessage(true)" type="">Clear Messages</a-button>
        </div>
    </div>
</template>
<script type="text/javascript">

    // import Utils from '@/common/local-utils.js';
    // import Dialogs from '@/common/local-dialogs.js';
    import store from '@/store/store.js';  
 

    export default {


        components: {
          
        },
        data() {
            return {
                messages  : [] ,
            }
        },
        props: {
            
        },
        watch: {},
        methods: {

            toZTC(date){
                if(date){
                    return date.format('yyyy-MM-dd hh:mm:ss');
                }
            },
  
            clearMessage(){
                store.dispatch('messages');
                this.messages = store.getters.messages;  
            }
        
        },
        filters: {},
        computed: {},
        created() {
            
        },
        mounted() {
            this.messages = store.getters.messages;  
        }
    }
</script>
<style>
.item {
    padding-left: 14px;
}
</style>
