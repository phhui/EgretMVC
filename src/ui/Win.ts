class Win extends PqView{
    protected maskBg:egret.Sprite;
    constructor(){
        super("win_module");
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    private addToStage(e:egret.Event){
        this.uiDict["panel"].x=(this.stage.stageWidth-this.uiDict["panel"].width)/2-30;
        this.uiDict["panel"].y=(this.stage.stageHeight-this.uiDict["panel"].height)/2;
        this.maskBg.graphics.beginFill(0x000000,0.8);
        this.maskBg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
    }
    protected init() {
        this.maskBg=new egret.Sprite();
        this.addChild(this.maskBg);
        this.maskBg.touchEnabled=true;
        this.call(SysCmd.LOAD_MODULE_RES,this.moduleName);
    }
    protected execute(): void {
        this.uiDict["btn_close"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeWindow,this);
    }
    public setTitle(title:string){
        this.uiDict["txt_title"].text=title;
    }
    private closeWindow(e:egret.TouchEvent):void{
        if(!this.parent)return;
        this.parent.removeChild(this);
        this.maskBg.graphics.clear();
        this.removeChild(this.maskBg);
    }
}