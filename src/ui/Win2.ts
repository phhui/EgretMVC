class Win2 extends PqView{
    protected maskBg:egret.Sprite;
    private _title:string="";
    private inited:boolean=false;
    private tmpName:string="";
    constructor(_name){
        super(_name);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    protected addToStage(e:egret.Event){
        this.setCenter();
        this.updateMask();
    }
    protected init(){
        this.maskBg=new egret.Sprite();
        this.addChild(this.maskBg);
        this.maskBg.touchEnabled=true;
        this.tmpName=this.moduleName;
        this.moduleName="win2_module";
    }
    protected execute(): void {
        this.moduleName=this.tmpName;
        this.createVeiew();
    }
    public setTitle(title:string){
        this._title=title;
        if(this.uiDict["txt_title"])this.uiDict["txt_title"].text=title;
    }
    public updateMask(){
        this.maskBg.graphics.beginFill(0x000000,0.8);
        this.maskBg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        this.uiDict["btn_close"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeWin,this);
        this.uiDict["txt_title"].text=this._title;
    }
    public setCenter(skewX:number=0,skewY:number=0){
        this.uiDict["panel"].x=(this.stage.stageWidth-this.uiDict["panel"].width)/2+skewX;
        this.uiDict["panel"].y=(this.stage.stageHeight-this.uiDict["panel"].height)/2+30+skewY;
    }
    private closeWin(e:egret.TouchEvent):void{
        if(!this.parent)return;
        this.parent.removeChild(this);
        this.maskBg.graphics.clear();
        this.removeListen(this.moduleName);
    }
}