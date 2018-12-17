class PqMgr extends PqMvc{
    private commandDict:Object={};
	private controlDict:Object={};
	private proxyDict:Object={};
	protected isStart:Boolean=false;
    constructor() {
    	super();
	    this.EventList.forEach(key=>{
        	this.addListen(key,this.eventHandle,this);
        });
		this.start();
	}
	private eventHandle(...args):void{
		this.execute.apply(this,args);
	}
	protected start():void{
		if(this.isStart)return;
		this.isStart=true;
	}
	protected execute(type:string,param:Object=null):void{
		
	}
	protected get EventList():Array<any>{
		return [];
	}
	protected regProxy(name:string,prototype:any):void{
		this.proxyDict[name]=prototype;
		this.proxyDict[name].Mgr=this;
		this.proxyDict[name].init();
	}
	protected proxy(name:string,param:Object,type:string=null):void{
		if(this.proxyDict[name])this.proxyDict[name].execute(param,type);
		else throw new Error("proxy :"+name+"未注册");
	}
	/**获取proxy，仅能获取当前模块的proxy，无法获取其它模块的proxy，其它模块proxy的数据通过shareData()和getData获取**/
	public getProxy(name:string):any{
		return this.proxyDict[name];
	}
	protected regController(name:string,prototype:any):void{
		this.controlDict[name]=prototype;
		this.controlDict[name].Mgr=this;
	}
	public control(name:string,param:Object=null,type:string=null):void{
		if(this.controlDict[name])this.controlDict[name].execute(param,type);
		else throw new Error("控制器"+name+"未注册");
	}
	protected regCommand(name:string):void{
		this.commandDict[name]=Object.create(window[name].prototype);
		this.commandDict[name].Mgr=this;
	}
	public command(name:string,param:Object=null,type:string=null):void{
		if(this.commandDict[name])this.commandDict[name].execute(param,type);
		else throw new Error("逻辑类"+name+"未注册");
	}
}