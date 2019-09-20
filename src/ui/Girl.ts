class Girl extends PqView{
    constructor(){
        super("girl_module");
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    private addToStage(e:egret.Event){
        this.uiDict["panel"].x=(this.stage.stageWidth-this.uiDict["panel"].width)/2-30;
        this.uiDict["panel"].y=(this.stage.stageHeight-this.uiDict["panel"].height)/2;
    }
    protected init() {
        this.call(SysCmd.LOAD_MODULE_RES,this.moduleName);
    }
    protected execute(): void {
        //this.uiDict["btn_close"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeWindow,this);
    }
    public setTitle(title:string){
        //this.uiDict["txt_title"].text=title;
    }
    private closeWindow(e:egret.TouchEvent):void{
        if(!this.parent)return;
        this.parent.removeChild(this);
    }
}