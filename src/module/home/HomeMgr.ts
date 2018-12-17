class HomeMgr extends PqMgr{
    constructor(){
        super();
    }
    protected start():void{
	    if(this.isStart)return;
		this.regProxy(HomeProxy.NAME,new HomeProxy());
		this.regController(HomeController.NAME,new HomeController());
		this.isStart=true;
	}
	protected get EventList():Array<any>{
		return [HomeCmd.SHOW_WINDOW,
					HomeCmd.CLOSE_WINDOW,
					HomeCmd.MODULE_NAME,
					HomeCmd.INIT_DATA];
	}
	protected execute(type:string, param:Object=null):void{
		switch(type){
			case HomeCmd.INIT_DATA:
				this.proxy(HomeProxy.NAME,param,type);
			break;
			default:
				this.control(HomeController.NAME,param,type);
			break;
		}
	}
}