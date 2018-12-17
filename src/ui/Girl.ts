class Girl extends PqView{
    static MODULE_NAME:string="girl_module";
    constructor(){
        super(Girl.MODULE_NAME);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        this.addListen(Girl.MODULE_NAME,this.createVeiew,this);
    }
    private addToStage(e:egret.Event){
        this.uiDict["panel"].x=this.stage.stageWidth*0.25-this.uiDict["panel"].width/2;
        //this.uiDict["panel"].y=(this.stage.stageHeight-this.uiDict["panel"].height)/2;
    }
    protected init() {
        //this.call(SysCmd.LOAD_MODULE_RES,this.moduleName);
    }
    private closeWindow(e:egret.TouchEvent):void{
        if(!this.parent)return;
        this.parent.removeChild(this);
    }
}