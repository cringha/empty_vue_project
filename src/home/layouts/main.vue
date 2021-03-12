<template>
    <a-layout id="components-layout-demo-responsive">
        <!-- :trigger="null"  -->
        <a-layout-sider
            class="main-frame-slidebar"
            breakpoint="lg"
            :collapsed="siderCollasped"
            collapsedWidth="0"
            @collapse="onCollapse"
            @breakpoint="onBreakpoint"
        >
            <div>
                <a class="logo">
                    <span>
                        <img
                            style="
                                padding-left: 0px;
                                width: auto;
                                height: 64px;
                                max-width: 100%;
                                max-height: 100%;
                            "
                            src="../../assets/logo-siemens.jpg"
                            alt="Siemens LOGO Image"
                        />
                    </span>
                </a>
            </div>
            <a-menu
                mode="inline"
                :subMenuOpenDelay="0"
                theme="light"
                :style="{ minHeight: calMenuHeight + 'px' }"
            >
                <a-sub-menu
                    :key="'_menu_' + index"
                    v-for="(one, index) in activeMenus"
                >
                    <span slot="title">
                        <a-icon :type="one.icon || 'mail'" />
                        <span> {{ one.title }} </span>
                    </span>

                    <a-menu-item
                        @click="titleClick(it)"
                        :key="'_menu_' + index + '_' + ii"
                        v-for="(it, ii) in one.children"
                    >
                        <a-icon :type="it.icon || 'mail'" /> {{ it.title }}
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu :key="'_sysMenu'">
                    <span slot="title">
                        <a-icon type="deployment-unit" />

                        <span>System</span>
                    </span>

                    <a-menu-item
                        @click="collapseSiderBar()"
                        :key="'_collapseLeftMenu'"
                        >Hide Menu</a-menu-item
                    >
                    <a-menu-item @click="logoutHandle()" :key="'_logout'">
                        Logout
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="main-frame-topbar">
                <!-- 如果左侧菜单隐藏了，那么出现这个图标，点击图标可以显示菜单   -->
                <a
                    v-if="siderCollasped && !showSiderCollasspedTriger"
                    class="ant-dropdown-link"
                    style="
                        color: #fff;
                        float: left !important;
                        padding-left: 10px;
                        font-size: 18px;
                    "
                >
                    <a-icon type="bars" style="" @click="collapseSiderBar()" />
                </a>

                <a-dropdown style="float: right !important; padding-right: 8px">
                    <a class="ant-dropdown-link" style="color: #fff">
                        <a-icon type="setting" />
                        <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay" style="width: 150px">
                        <a-menu-item>
                            <a @click="message()">Message</a>
                        </a-menu-item>

                        <a-menu-item>
                            <a @click="logoutHandle()">Logout</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a @click="about()">About</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
                <div
                    style="
                        float: right !important;
                        padding-right: 8px;
                        padding-top: 6px;
                    "
                >
                    <avatar :username="userAccount" :src="userAvatarUrl"></avatar>
                </div>
                <div style="float: right !important; padding-right: 28px">
                    <span style="color: #ffffff">
                        <strong>{{ userName }}</strong>
                    </span>
                </div>
            </a-layout-header>
            <a-layout-content class="main-frame-layout-content">
                <router-view class="main-content-view"></router-view>
            </a-layout-content>
            <a-layout-footer class="z-size-m" style="textalign: center"
                >{{ copyright }} - {{ company }} -- Version: {{ version }} /
                {{ BUILD_DATE }}
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
import Dialogs from "@/common/local-dialogs.js";
import Avatar from "vue-avatar";
import Messages from "../sys.pages/messages.vue";
import { RouteMenus } from "@/store/routes-menu.js";
import store from "@/store/store.js";
import * as Layouts from "@/home/layouts/config.js";

import AboutPage from "../sys.pages/about.vue";

export default {
    data() {
        return {
            showSiderCollasspedTriger: false,
            version: VERSION || "1",
            BUILD_DATE: BUILD_DATE || "",
            backgroundCanvas: true,
            siderCollasped: false,
            headerHeight: Layouts.FRAME_HEADER_HEIGHT,
            footerHeight: Layouts.FRAME_FOOTER_HEIGHT,
            paddingHeight: 32,
            contentHeight: this.calContentHeight(),
            sidebarDisplay: true,
            menus: [],
            userAvatarUrl: "",
            userTick: 0,
            // LogoCRP: LogoCRP,
            q: "",
            link: "",
            copyright: Layouts.COPY_RIGHT,
            company: Layouts.COMPANY,

            // current: ['mail'],
            // openKeys: ['sub1'],
        };
    },
    components: { Avatar },
    computed: {
        validUser() {
            let id = store.getters.id;
            if (
                id != undefined &&
                id != null &&
                typeof id == "number" &&
                id > 0
            )
                return true;

            return false;
        },

        calMenuHeight() {
            // 计算左侧菜单高度，如果隐藏， 下面的 footbar 不显示
            let height = this.contentHeight + this.paddingHeight;
            height = height + this.footerHeight;
            return height;
        },
        userAvatar() {
            let id = store.getters.id;
            return "";
        },

        userName() {
            let name = store.getters.name;
            if (name) return name;
            return store.getters.account;
        },
        userAccount() {
            let act = store.getters.account;
            if (!act) return store.getters.name || "";
            return act;
        },

        activeMenus: function () {
            let menus = this.menus;
            let q = this.q;
            if (!q) return menus;
            let zm = findInMenus(menus, q.toLowerCase());
            // menus.filter(function(e){
            //    let find =  findInMenus([e],q ) ;
            //    return find;
            // }) ;
            return zm;
        }, // contains only {Alex: {…}, James: {…}}
    },
    methods: {
        collapseSiderBar(opts) {
            if (opts == undefined || opts == null) {
                this.siderCollasped = !!!this.siderCollasped;
            } else {
                this.siderCollasped = !!!opts.display;
            }
            console.log(" in frame collapseSiderBar ", this.siderCollasped);

            this.calContentHeight();

            // 当边框变换时，需要触发 resize 事件，否则
            // chart 大小计算有问题
            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 200);
        },
        onSearch(e) {
            if (e && e.target) {
                let val = e.target.value;
                if (this.q != val && typeof val === "string")
                    this.q = val.trim();
            }
        },

        userRefresh() {
            this.userTick = this.userTick + 1;
            this.loadUserAvatar();
        },
        loadUserAvatar() {
            let that = this;
            let id = store.getters.id;
            let avatar = store.getters.avatar;
          
            if (id && typeof id == "number" && id <= 0) 
                return;

            if( avatar )
                that.userAvatarUrl = avatar; // avatar;
        },
        titleClick(it) {
            this.$router.push(
                { path: it.path },
                () => {},
                (e) => {
                    console.log("输出报错", e);
                }
            );
        },
        onCollapse(collapsed, type) {
            console.log(" in frame  onCollapse ", collapsed, type);
            this.showSiderCollasspedTriger = collapsed;
            this.collapseSiderBar();
        },

        onBreakpoint(broken) {
            // console.log(broken);
        },

        about() {
            Dialogs.open({
                title: "ABOUT",
                url: AboutPage, //Org, //传递的组件对象
                parent: this, //当前的vue对象
                data: {}, //props
                width: "600px",
                height: "600px",
                callback: function (save) {},
            });
        },

        message() {
            Dialogs.open({
                title: "Messages",
                url: Messages,
                parent: this, //当前的vue对象
                data: {}, //props
                width: "800px",
                height: "600px",
                callback: function (save) {},
            });
        },

        logout() {
            store.dispatch("logout", { inst: this });
        },

        logoutHandle(opts) {
            // opts = opts || {} ;
            //   let time = 1;
            let that = this;
            let token = store.getters.session;
            if (token) {
                that.logout();
            }
        },

        calContentHeight() {
            let height =
                window.innerHeight - this.headerHeight - this.paddingHeight;

            height = height - this.footerHeight;
            return height;
        },
    },
    created() {
        this.$bus.$on("logout", this.logoutHandle);
        this.$bus.$on("user.refresh", this.userRefresh);
        this.$bus.$on("sider.collaspe", this.collapseSiderBar);
    },
    mounted() {
        // this.$bus.$on('user.refresh', this.userRefresh);
        this.menus = RouteMenus; // parseMenus(store);
        console.log("in mounted ,  Frame hook resize event ");
        this.loadUserAvatar();

        this.$nextTick(() => {
            window.addEventListener("resize", () => {
                this.contentHeight = this.calContentHeight();
            });
        });

        setTimeout(function () {
            window.dispatchEvent(new Event("resize"));
        }, 10);
    },
};
</script>
<style  >
#components-layout-demo-responsive .logo {
    height: 32px;
    /*background: rgba(255, 255, 255, .2);*/

    margin: 0px;
}

.main-frame-slidebar {
    /*background: #4a90e2*/
    background: #fff;
    /*box-shadow: 2px 0 6px rgba(0,21,41,.35);*/
    /*box-shadow : 0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 2px 6px 0 rgba(0, 0, 0, 0.19);*/
}

.main-frame-topbar {
    background: #4a90e2;
    /*background: #fff;*/
    padding: 0px;
}

.main-content-view {
    background: #fff;
}

@media (max-width: 575.98px) {
    .frame-header-top-padding {
        padding: 4px;
    }
}

@media (min-width: 575.98px) {
    .content-header {
        min-height: 64px;
    }
    .frame-header-top-padding {
        padding: 4px;
    }
    .main-frame-layout-content {
        /* margin: 16px; */
        padding: 4px;
    }
}

/*  Small devices (landscape phones, less than 768px) */
@media (min-width: 767.98px) {
    .main-frame-layout-content {
        /* margin: 16px; */
        padding: 4px;
    }
    .main-frame-layout-content {
        /* margin: 16px; */
        padding: 16px;
    }

    .content-header {
        min-height: 64px;
    }
    .frame-header-top-padding {
        padding: 4px;
    }
}

/* // Medium devices (tablets, less than 992px) */
@media (min-width: 991.98px) {
    .frame-header-top-padding {
        padding: 14px;
    }
}

/* // Large devices (desktops, less than 1200px) */
@media (min-width: 1199.98px) {
    .frame-header-top-padding {
        padding: 14px;
    }
}
</style>
