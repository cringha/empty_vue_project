<template>
    <div>
        <div style="max-width: 600px;     margin: auto; min-height: 10em; vertical-align: middle;">
            <h1>404 , No permission or Not Found</h1>

            <a @click="index();">
                <i class="icon-exit"></i> index
            </a>
            <a @click="logout();">
                <i class="icon-exit"></i> Logout
            </a>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {};
    },
    props: {},
    watch: {},
    methods: {
        logout() {
            this.$store.dispatch("logout", { inst: this });
        },
        index() {
            this.$router.push({ path: "/frame/index" });
        }
    },
    filters: {},
    computed: {},
    created() {},
    mounted() {}
};
</script>
<style>
 
</style>
