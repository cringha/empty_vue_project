<template>
    <div>
        <!-- Main navigation -->
        <div class="navbar navbar-inverse" role="navigation">
            <div class="navbar-header">
                <a class="navbar-brand" href="/"> 
                    系统名称
                </a>
                <a class="sidebar-toggle"><i class="icon-paragraph-justify2"></i></a>
                <!-- 按钮    -->
                <button type="button" class="navbar-toggle offcanvas">
                    <span class="sr-only">Toggle navigation</span>
                    <i class="icon-paragraph-justify2"></i>
                </button>
            </div>
            <ul class="nav navbar-nav navbar-right collapse" id="navbar-icons">
                <li class="user dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown">
                        <span @click="goLink();">UERNAME </span>
                        <i class="caret"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right icons-right">
                        <li><a href="#" onclick="showMultiDialog();"><i class="icon-user"></i> MultiPie Groups</a></li>
                        <li><a href="#" onclick="showConfigDialog();"><i class="icon-cog"></i> Settings</a></li>
                        <li><a href="#" onclick="showSyncDialog();"><i class="icon-bubble4"></i> Sync config</a></li>
                        <li><a href="#Logout"><i class="icon-exit"></i> Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- end Main navigation -->
        <!-- right panel container -->
        <div class="page-container sidebar-hidden" id="app">
            <!-- Sidebar -->
            <div class="sidebar">
                <div class="sidebar-content">
                    <!-- Main navigation -->
                    <ul class="navigation" id="enum">
                        <li>
                            <router-link :to='{ path: "/mgr/ProjectList" , params: { title: "ProjectList" } }'>
                                <span>项目管理 </span> <i class="icon-paragraph-justify2"></i></router-link>
                        </li>
                        <li>
                            <router-link to="/mgr/ParamTypeList"><span>参数类型 </span> <i class="icon-paragraph-justify2"></i></router-link>
                        </li>
                        <li>
                            <router-link to="/mgr/ParamList"><span>参数管理</span> <i class="icon-paragraph-justify2"></i></router-link>
                        </li>
                        <li>
                            <router-link to="/mgr/DataSourceList"><span>数据源管理</span> <i class="icon-paragraph-justify2"></i></router-link>
                        </li>
                        <li>
                            <router-link to="/mgr/DataSetList"><span>数据集源管理</span> <i class="icon-paragraph-justify2"></i></router-link>
                        </li>
                        <li>
                            <router-link to="/mgr/GadgetList"><span>Gadgets </span> <i class="icon-vector"></i></router-link>
                        </li>
                        <li>
                            <router-link to="/mgr/APIList"><span> REST APIs </span> <i class="icon-vector"></i></router-link>
                        </li>
                        <li>
                            <router-link to="/Pages"><span> Pages </span> <i class="icon-vector"></i></router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /sidebar -->
            <!-- Page content -->
            <div class="page-content">
                <router-view class="view"></router-view>
            </div>
            <!-- end Page content -->
        </div>
        <!-- End of page container  -->
    </div>
</template>
<script>
export default {
    data() {
            return {

            }
        },
        components: {},

        methods: {
            goLink() {
                this.$router.push({ path: '/mgr/ParamTypeList', query: { title: '123' }});


            },
        }
}
</script>
<style>
 
</style>
