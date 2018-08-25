class PqGame extends PqMvc{
	protected ui: any;
	protected btnNameList: Array<any> = [];
	protected funcList: Array<any> = [];
	protected target: any;
	constructor()
	{
    	super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage,this);
	}
	protected addToStage(e: Event): void{
        this.execute();
	}
	protected execute(){
        this.ui = new PqView();
        this.addChild(this.ui);
        this.ui.touchEnabled = true;
        this.registerEvent();
	}
	protected registerEvent(){
        this.ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameClick,this);
	}
	protected gameClick(e:egret.TouchEvent): void{
        EventHelper.send(e, this.btnNameList, this.funcList, this.target);
	}
} 