// "use strict";

import Vue from 'vue';
 
/**
 vue-layer 0.9
let layerEngine = require('vue-layer');
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

*/
/*
// vue-layer 1.0.2
import layer from '../3rd/vue-layer';
// import '../3rd/vue-layer/lib/vue-layer.css'; 
 
 */

// vue-layer 1.1.7
// import layer from 'vue-layer'
// import 'vue-layer/lib/vue-layer.css';

//  vue-layer 1.1.8
//  import layer from '../3rd/vue-layer-master/packages/layer';
//  import '../3rd/vue-layer-master/packages/layer/src/css/index.less';


// 1.2.1
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';

Vue.prototype.$layer = layer(Vue);
function mobilecheck() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function parseWdithOrHeight(hw) {
    if (typeof hw == 'string') {
        if (hw.indexOf('px') > 0 || hw.indexOf('%'))
            return hw;
        else {
            return hw + 'px';
        }
    } else {
        return '' + hw + 'px';
    }
}


class DialogHandle {
    constructor(h, dlg) {
        this.index = h;
        this.dlg = dlg;

    }

    close(msg) {
        this.dlg.close0(this.index, msg);
    }
}

class _Dailogs {

    constructor(vue) {
        let that = this;

        // let layer = layerEngine(Vue);
        this.layer = Vue.prototype.$layer; // this.$layer;
        this._stack = [];

    }



    _getTop() {
        if (this._stack.length == 0)
            return null;
        let one = this._stack.pop();
        // _stack[_stack.length-1];
        // _stack = _stack.splice( _stack.length ,1);
        return one;
    }

    msg(time) {
        this.layer.loading({ time: time });
    }
    loading(time=3) {
        
        return this.layer.loading({ time: time });
    }

    close(result) {
        this.close0(null, result);
    }

    close0(id, result) {
        // debugger;
        let _stack = this._stack;
        if (_stack && _stack.length > 0) {

            if (id) {
                let fz = null;
                for (let i = 0; i < _stack.length; i++) {
                    let el = _stack[i];
                    if (el) {
                        if (el.id == id) {
                            fz = el;
                            _stack.splice(i, 1);
                            break;
                        }
                    }
                }

                if (fz) {


                    this.layer.close(fz.id);
                    if (fz.callback) {
                        fz.callback(result);
                    }
                }
            } else {
                let fz = this._getTop();
                if (fz) {
                    this.layer.close(fz.id);
                    if (fz.callback) {
                        fz.callback( result ,{cancel:true});
                    }
                }
            }

        }
    }


    /*
     check is mobile 
     */
    isMobile() {
        if (window.innerWidth <= 800 || window.innerHeight <= 600) {
            return true;
        } else {
            return false;
        }
    }




    open(opts) {

        let mobile = this.isMobile();
        let parent = opts.parent;
        let url = opts.url;


        let callback = opts.callback;
        let data = opts.data || {};
        let title = opts.title;

        let area = opts.area;
        if (!!!area) {
            let height = opts.height || '600px'; // '820px' ;
            let width = opts.width || (mobile ? '95%' : '800px'); // '800px' ;

            if (mobile) {
                width = '95%';
            }
            area = [parseWdithOrHeight(width), parseWdithOrHeight(height)];

        }

        let handle = { callback: callback };
        // debugger;
        console.log(' in open dialog  data is ', data);
        let index = this.layer.iframe({
            content: {
                content: url, //传递的组件对象 
                parent: parent,//当前的vue对象 
                data: data,//props 
                on: opts.on,
            },

            // shade: 0.,
            shade: true,
            title: title,
            shadeClose: false,
            area: area,
            cancel: () => {//关闭事件
                // alert('关闭iframe');
                this.close(false,{index});
            }
        });


        handle.id = index;
        this._stack.push(handle);

        return new DialogHandle(index, this);
    }

    message(...args) {
        if (args && typeof args === 'string') {
            this.notify(args);
           
        }
        else if (Array.isArray(args)) {
            let lzc = args.join(' ');
            this.notify(lzc);
 

        }
    }
    confirm(content, yes, cancel) {


        this.layer.confirm(content, {}, (id) => {
            if (yes)
                yes();
            this.layer.close(id);
        }, (id) => {
            if (cancel)
                cancel();

            this.layer.close(id);
        }
        );

    }

    info(msg) {
        if (msg && typeof msg == 'string') {
            Vue.prototype.$notification['success']({
                title: 'Success',
                text: msg
            });
        } else {
            this.notify(msg);
        }

    }
    error(msg) {
        this.notify({ type: 'error', text: msg })
    }
    notify(opts) {
        if (typeof opts == 'string')
            opts = { text: opts };


        let type = opts.type || 'error';
        Vue.prototype.$notification[type]({
            message: opts.title || 'Error',
            description: opts.text || ''
        });



        // 


        // Vue.prototype.$notify({
        //     title: opts.title || 'Error',
        //     duration: opts.duration || 5000,
        //     type: opts.type || 'error',

        //     text: opts.text || ''
        // });
    }

    closeContent(index) {
        this.layer.close(index);
    }




}


export default new _Dailogs(Vue);


//  {
//     Dailogs : new _Dailogs(_layer)
// };




