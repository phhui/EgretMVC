class MapsMgr extends BaseMgr{
    constructor(){
        super();
    }
    protected start():void{
	    if(this.isStart)return;
		this.regProxy(MapsProxy.NAME,new MapsProxy());
		this.regController(MapsController.NAME,new MapsController());
		this.isStart=true;
	}
	protected get EventList():Array<any>{
		return [MapsCmd.SHOW_WINDOW,
					MapsCmd.CLOSE_WINDOW,
					MapsCmd.MODULE_NAME,
					MapsCmd.INIT_DATA];
	}
	protected execute(type:string, param:Object=null):void{
		switch(type){
			case MapsCmd.INIT_DATA:
				this.proxy(MapsProxy.NAME,param,type);
			break;
			default:
				this.control(MapsController.NAME,param,type);
			break;
		}
	}
}