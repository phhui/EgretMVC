class PqProxy implements IProxy{
	//static NAME:String="继承此类必需定义该NAME，且名字和文件名一样,如文件名为XXProxy,则NAME值为XXProxy";
	private md:PqMgr;
	private cacheKey:string;
    constructor(){
    }
	/**初始化后会被自动执行**/
	public init():void{}
	public set Mgr(m:PqMgr){
		if(this.md!=null)throw new Error("PQMgr已赋值");
		this.md=m;
	}
	/**监听消息**/
	protected addListen(event:string,callBack:Function){
		this.md.addListen(event,callBack,this);
	}
	/**广播**/
	protected call(name:String,...args){
			args.unshift(name);
		this.md.call.apply(null,args);
	}
	/**
	 *获取共享数据 
	 * @param key 钥匙
	 * @param args 参数
	 * @return 
	 * 
	 */		
	public getData(key:string,...args):any{
		args.unshift(key);
		return this.md.getData.apply(null,args);
	}
	public shareData(key:string,data:Function){
		this.md.shareData(key,data);
	}
	public execute(param:Object=null, type:String=null)
	{
		
	}
	/**格式化HttpRequest请求结果 return object */
	protected parse(e:Event){
		try{
			return JSON.parse(e.currentTarget["response"]);
		}catch(err){
			return {msg:e.currentTarget["response"]};
		}
	}
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
}