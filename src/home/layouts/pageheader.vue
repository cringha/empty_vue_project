<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <a-row style="padding: 10px">
                <a-col :lg="12" :md="12" :sm="0" :xs="0">
                    <h1>
                        {{ message }}
                    </h1>
                </a-col>
                <a-col :lg="6" :md="0">
                    <slot name="middle"> </slot>
                </a-col>
                <a-col :lg="6" :md="12" :sm="24">
                    <slot> </slot>
                </a-col>
            </a-row>
            <div style="padding: 10px; background-color: #efefef"></div>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    components: {},
    props: {
        navigator: {
            type: Boolean,
            default: true,
        },
        message: {
            type: String,
            default: "Version. 1.0",
        },
    },
};
</script>

<style scoped>
</style>
