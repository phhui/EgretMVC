class Loading extends egret.Sprite {
    private panel: egret.Sprite;
    private loadBar:egret.Sprite;
    private pointSpList:Array<any>=[];
    private txt: egret.TextField;
    private _loadProgress: number = 0;
    private loadBarWidth:number=0;
    private isClose: boolean = false;
    private static _self:Loading;
    constructor() {
        super();
        this.init();
    }
    static get self():Loading{
        if(!this._self)this._self=new Loading();
        return this._self;
    }
    private get loadProgress():number{
        return this._loadProgress;
    }
    private set loadProgress(value:number){
        this._loadProgress=value;
    }
    private init() {
        this.panel = new egret.Sprite();
        this.loadBar=UiHelper.createRect(0,0,1,20,0,0x000000,0x666666);
        this.panel.addChild(this.loadBar);
        this.addChild(this.panel);
    }
    public show(str:string="") {
        if(str)this.setTxt(str);
        this.loadBar.y=this.stage.stageHeight/2-10;
        Timing.addListen("showLoadingAction",0.1,this.loading,this);
        this.visible=true;
    }
    public close() {
        this.isClose = true;
        Timing.removeListen("showLoadingAction");
        this.pointSpList=[];
        this.txt.text="";
        this.visible=false;
    }
    public update(val: number,msg:string="") {
        this.loadProgress = val;
        if(msg)this.setTxt(msg);
    }
    private setTxt(str:string){
        if(!str)return;
        if(!this.txt)this.txt=UiHelper.createTxt({text:str,y:this.stage.stageHeight/2+20,width:this.stage.stageWidth,align:"center",size:36,color:0xffffff,height:50});
        else this.txt.text=str;
        this.panel.addChild(this.txt);
    }
    private loading() {
        if (this.isClose)return;
        UiHelper.drawRect(this.loadBar,0x666666,1,0,0,this.loadBarWidth,20);
        this.loadBarWidth=this.loadProgress*this.stage.stageWidth;
        this.createBox();
        if(this.loadBarWidth>=this.stage.stageWidth)this.close();
    }
    private createBox():egret.Sprite{
        let sp:egret.Sprite=UiHelper.createRect(0,0,10,10,0,0,0xffffff);
        sp.x=this.stage.stageWidth+Math.random()*100;
        sp.y=Math.random()*this.stage.stageHeight;
        if(this.pointSpList.length%2==1){
            sp.x=Math.random()*this.stage.stageWidth;
        }
        this.pointSpList.push(sp);
        this.panel.addChild(sp);
        TweenLite.to(sp,1.2,{x:this.loadBarWidth+Math.random()*50,y:this.loadBar.y+5,onComplete:this.removeBox,target:this,onCompleteParams:[sp]});
        return sp;
    }
    private removeBox(...args){
        if(args[0]&&args[0].parent){
            args[0].parent.removeChild(args[0]);
            this.pointSpList.shift();
        }
    }
}