class PqController implements IControl{
	//static NAME:String="继承此类必需定义该NAME，且名字和文件名一样,如文件名为XXController,则NAME值为XXController";
	private md:PqMgr;
	private _inited:Boolean=false;
	/**等待处理的事件列表，inited为false时所有事件都存储在这里，为true后遍历触发**/
	protected delayList:Array<any>=[];
	protected eventList:Array<any>=[];
	protected btnNameList: Array<any> = [];
	protected funcList: Array<any> = [];
	protected target: any;
	protected ui: any;
	constructor(){

    }
	public set Mgr(m:PqMgr){
		if(this.md!=null)throw new Error("MmMgr已赋值");
		this.md=m;
	}
	protected get inited():Boolean	{
		return this._inited;
	}
	protected set inited(value:Boolean){
		this._inited = value;
		if(value&&this.delayList){
			while(this.delayList.length>0){
				this.execute(this.delayList[0][1],this.delayList[0][0])
				this.delayList.shift();
			}
		}
		if(this._inited)this.registerEvent();
	}
	/**发送指令到模块内部command处理**/
	public command(name:string,param:Object=null,type:string=null):void{
		this.md.command(name,param,type);
	}
	/**监听消息**/
	/*protected addListen(event:string,callBack:Function):void{
		this.md.addListen(event,callBack);
	}*/
	/**广播**/
	protected call(name:string,...args):void{
		args.unshift(name);
		this.md.call.apply(this.md,args);
	}
	/**删除监听**/
	protected removeListen(name:string,func:Function=null,target:any=null):void{
		this.md.removeListen(name,func,target);
	}
	/**
	 *获取共享数据 
	 * @param key 钥匙
	 * @param args 参数
	 * @return 
	 * 
	 */		
	public getData(key:string,...args):Object{
		args.unshift(key);
		return this.md.getData.apply(this.md,args);
	}
	public shareData(key:string,data:Function):void{
		this.md.shareData(key,data);
	}
	/**如果界面还没初始化则延迟到初始化后再执行**/
	protected delay(name:string,param:Object=null):void{
		this.delayList.push([name,param]);
	}
	/**调用模块内部controller**/
	public control(name:string,data:Object=null,type:string=null):void{
		this.md.control(name,data,type);
	}
	/**获取proxy，仅能获取当前模块的proxy，无法获取其它模块的proxy，其它模块proxy的数据通过shareData()和getData获取**/
	protected getProxy(name:string):any{
		return this.md.getProxy(name);
	}
	public execute(param:Object=null, type:string=null):void
	{
		// TODO Auto-generated method stub
		this.ui=new PqView(null);
        this.ui.touchEnabled = true;
	}
	
	//==================Cache===Start=====================
	protected setCacheKey(key:string){
		CacheMgr.self.setCacheKey(key);
	}
	protected removeCacheKey(){
		CacheMgr.self.removeCacheKey();
	}
    /**保存缓存    
     * saveCache(缓存名称，缓存内容，缓存有效期(分钟)-默认为0 不过期)     
	 */
	protected saveCache(key:string,data:any,period:number=0){
		CacheMgr.self.saveCache(key,data,period);
	}
    /**获取缓存 */
	protected getCache(key:string){
		return CacheMgr.self.getCache(key);
	}
	protected removeCache(key:string){
		CacheMgr.self.removeCache(key);
	}
    /**----【缓存用户数据】----    
     * saveUserCache(缓存名称，缓存内容，缓存有效期(分钟)-默认为0 不过期)    
     * 该方法需要确认已设置cacheKey，用于区分不同用户或ID的数据 */
    protected saveUserCache(key:string,data:any,period:number=0){
		CacheMgr.self.saveUserCache(key,data,period);
    }
	/**----【获取用户缓存】---- */
    protected getUserCache(key:string){
		return CacheMgr.self.getUserCache(key);
    }
	/**删除用户缓存 */
    protected removeUserCache(key:string){
        CacheMgr.self.removeUserCache(key);
    }
    protected clearCache(){
		CacheMgr.self.clearCache();
    }
	//===================Cache===End========================

	protected registerEvent(){
        this.ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameClick,this);
	}
	protected gameClick(e:egret.TouchEvent): void{
        EventHelper.send(e, this.btnNameList, this.funcList, this.target);
	}
}