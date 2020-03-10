class Tips extends egret.Sprite {
    private str: string = "";
    private txt: egret.TextField;
    private fx: number = 1;
    private defY: number = 0;
    constructor() {
        super();
    }
    public static create(text: string, panel: any, x: number, y: number) {
        var tip: Tips = new Tips();
        tip.show(text,panel,x,y);
    }
    public show(text: string, panel: egret.Sprite, x: number, y: number) {
        this.str = text;
        this.x = x;
        this.y = y;
        panel.addChild(this);
        this.init();
    }
    private init() {
        let sp:egret.Sprite=UiHelper.createRoundRect(0,0,600,50,1,0x000000,0x000000,0.2,10);
        sp.x=this.stage.stageWidth/2-300;
        this.addChild(sp);
        this.txt = UiHelper.createTxt({ text: this.str,font:"黑体",bold:true, width: this.stage.stageWidth,align:"center", height: 150, size: 36, color: 0xffffff, parent: this });
        //UiHelper.stroke(this.txt,0x000000,1,3);
        this.txt.y=5;
        let ty:number=this.y-300;
        TweenLite.to(this,0.3,{y:ty,alpha:1,onComplete:this.removeAction,target:this});
    }
    private removeAction(){
        let ty:number=this.y-200;
        TweenLite.to(this,0.3,{y:ty-200,alpha:0,visible:false,delay:800,onComplete:this.removeThis,target:this});
    }
    private removeThis(){
        this.parent.removeChild(this);
    }
}