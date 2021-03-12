<template>
    <div style="width: 100% ; padding: 8px;">
        <a-row class="row-padding">
            <a-col :span="6" class="offset" > {{appName}} </a-col>

            <a-col :span="12" class="offset" >
                <span>{{ version }}  </span>
            </a-col>
            <a-col :span="6" class="offset" >
                <span>  {{ BUILD_DATE }}</span>
            </a-col>
            
        </a-row>
       
       <a-row class="row-padding">
            <a-col :span="6" class="offset" >Auth Service </a-col>

            <a-col :span="12" class="offset" >
                <span>{{ auth.ver }}  </span>
            </a-col>
            <a-col :span="6" class="offset" >
                <span>  {{ auth.build  }}</span>
            </a-col>
            
        </a-row>
       
       <a-row class="row-padding" v-for="v in versions" :key=v.name >
            <a-col :span="6" class="offset" > {{v.name}} </a-col>

            <a-col :span="12" class="offset" >
                <span> {{ v.ver }}  </span>
            </a-col>
            <a-col :span="6" class="offset" >
                <span> {{ v.build  }} </span>
            </a-col>
            
        </a-row>
              
        <div style="position: fixed;  bottom: 40px; right: 10px;">
            <a-button @click="closePanel(true)" type="primary">Close</a-button>
        </div>
    </div>
</template>
<script type="text/javascript">
 import Dialogs from "@/common/local-dialogs.js";
export default {
    components: {},
    data() {
        return {
            appName :  APP_NAME || 'Dashboard Page Management' ,
            version:    VERSION || "1",
            BUILD_DATE: BUILD_DATE || "",
            auth : {} ,
            versions : [] 
        };
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
        closePanel(save) {
            Dialogs.close(save);
        }
    },
    filters: {},

    created() {},
    mounted() {
 
    }
};
</script>
<style scoped>
.offset{
    padding:3px;
}
</style>
