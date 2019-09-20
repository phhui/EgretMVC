class PqProxy implements IProxy{
	//static NAME:String="继承此类必需定义该NAME，且名字和文件名一样,如文件名为XXProxy,则NAME值为XXProxy";
	private md:PqMgr;
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
}