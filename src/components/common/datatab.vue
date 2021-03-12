<script>
import { setTimeout } from 'timers';
import Storage from '@/common/utils-storage.js';
import Utils from "@/common/local-utils.js";
	/**
  将 datatable 的搜索数据，转换为  t服务的搜索格式
*/
function getOrder( sorter , sortOrder) {

	if( sorter ) {
		if (sortOrder === 'ascend'){
			return sorter ;
		}else if (sortOrder == 'descend') {
			return '-' + sorter ;
		}
	}
    return null;

} 


export default {
	components: {
    },
	
	data() {
		return {
            loaderTimeoutHandle:null,
			data: [],
			pagination: {
                total:0,
                current : 1 ,
				pageSize: this.getDefaultPageSize() , // 默认每页显示数量
				showSizeChanger: true, // 显示可改变每页数量
				pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
				showTotal: total => `Total ${total} items`, // 显示总数
				showSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示

			},
			loading: false, 
			order : '',
			
		}
	},
	props: {
 
	},
	methods: {
        
        getDefaultPageSize(){
            return 10;
        },

        onChangePageSize( cur, size ){
            
            this.pageSize = size
        },

        clear(){
            this.data=[] ;
            this.loading = false ;
            
        },


        getStorege(){
            if( !this._storage ) {
                this._storage = new Storage( 'page.urls','sessions' );

            }
            return this._storage;
            
        },

        saveCurrentPage(cur){
            let url = this.$route.path; 
            let s = this.getStorege();
            let urls = s.load('current');
            if( urls == null )
                urls = {};

            urls[url] = cur ;
            s.save( 'current', urls );
        },

        loadCurrentPage(){
            let url = this.$route.path; 
            let s = this.getStorege();
            let urls = s.load('current');
            if(urls )
                return urls[url] ;

            return undefined;
        },

		handleTableChange(pagination, filters, sorter) {
			// console.log( pagination, filters, sorter)
			pagination = pagination || this.pagination ; 
			sorter = sorter || {}

			this.order = getOrder( sorter.field , sorter.order)
            
			// this.current = pagination.current
			this.fetch({
				pageSize: pagination.pageSize,
				current: pagination.current ,
				order: this.order,
				...filters,
			});
		},


		load(){

            let that = this;

            let current = this.loadCurrentPage() || this.pagination.current;
            if( current == undefined )
                current = this.pagination.current ;
            

            if (this.timeoutfnDraw == null ) {
                this.timeoutfnDraw = Utils.createRunOnce();
            }
            this.timeoutfnDraw.run(()=>{
                that.fetch({
                    pageSize : this.pagination.pageSize ,
                    current ,
                    order: this.order,
                });

            },   100  );


            // this.fetch({
            //     pageSize : this.pagination.pageSize ,
            //     current ,
            //     order: this.order,
            // });

            // if (this.loaderTimeoutHandle == null ) {
            //     this.loaderTimeoutHandle = Utils.createRunOnce();
            // }
            // this.loaderTimeoutHandle.run(()=>{
            //     console.log('in datatab load , ...  ')
            //     this.fetch({
            //         pageSize : this.pagination.pageSize ,
            //         current: this.current,
            //         order: this.order,
            //     });

            // },200);
	
		},

		fetch(params = {}) {
			// console.log('params:', params);

			let pageSize = params.pageSize || 10;
			let current = params.current || 1;

			this.loading = true;
			let that = this;

            console.log('in datatab loader  , ...  ')


			this.loader( params , 
                function( result , total ){
                    const pagination = { ...that.pagination };
                    that.pagination.total =  total || 0;
                    that.pagination.pageSize =  pageSize;
                    that.pagination.current = current;

                    that.data = result || [] ;
                    // that.pagination = pagination;


                    that.saveCurrentPage( current );


                    // // 如果 返回的数据集小于 当前页数， 那么调整到第一页 
                    if( pagination.total > 0 &&  result.length == 0  ) {
                        that.current = that.pagination.current = 1 ;
                        setTimeout( ()=> that.fetch( {  current : that.pagination.current , pageSize  } ) , 100);
                        return ;
                    }
                    
                    // that.$nextTick(()=>{
                    //     that.data = result;
                    //     that.pagination = pagination;

                    // })
                    setTimeout( ()=>{
                       that.loading = false; 
                        // console.log( 'set loading = false ')
                    },100)

                }, function (err) {
                    that.loading = false;
                    // console.log( 'set loading = false (in error) ')
                    console.log(err);
                }
            );

		},
		 
	},
	mounted() {
        let url = this.$route.path; 
        console.log("datatab ==> " , url )

        // 再重新进入本页时， 清除记录
        // this.saveCurrentPage(1);
		this.load();
	},
}
</script>
