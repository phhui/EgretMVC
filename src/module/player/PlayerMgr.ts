class PlayerMgr extends PqMgr{
    constructor(){
        super();
    }
    protected start():void{
	    if(this.isStart)return;
		this.regProxy(PlayerProxy.NAME,new PlayerProxy());
		this.regController(PlayerController.NAME,new PlayerController());
		this.isStart=true;
	}
	protected get EventList():Array<any>{
		return [PlayerCmd.SHOW_WINDOW,
					PlayerCmd.CLOSE_WINDOW,
					PlayerCmd.MODULE_NAME,
					PlayerCmd.INIT_DATA,
					PlayerCmd.PLAYER_WALK,
					PlayerCmd.PLAYER_STAND,
					PlayerCmd.PLAYER_JUMP,
					MapsCmd.TOUCH];
	}
	protected execute(type:string, param:Object=null):void{
		switch(type){
			case PlayerCmd.INIT_DATA:
				this.proxy(PlayerProxy.NAME,param,type);
			break;
			default:
				this.control(PlayerController.NAME,param,type);
			break;
		}
	}
}