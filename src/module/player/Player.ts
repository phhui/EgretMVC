class Player extends egret.Sprite{
    private v:PlayerVo;
    private txt_name:egret.TextField;
    private model:egret.Sprite;
    private lfooder:egret.Sprite;
    private rfooder:egret.Sprite;
    private to:egret.Point;
    private fooderStatus:boolean;
    private fooderFix:number=3;
    constructor(_v:PlayerVo){
        super();
        this.v=_v;
        this.createView();
    }
    private createView(){
        let img:egret.Bitmap=ResMgr.getRes("base#mg2");
        this.model=new egret.Sprite();
        this.model.addChild(img);
        img.x=0-img.width/2;
        img.y=0-img.height;
        this.addChild(this.model);
        this.model.scaleX=this.model.scaleY=0.3;

        this.lfooder=new egret.Sprite();
        this.lfooder.addChild(ResMgr.getRes("base#mgFooder"));
        this.model.addChild(this.lfooder);
        this.lfooder.x=-150;
        this.lfooder.y=-80;
        this.lfooder.scaleX=this.lfooder.scaleY=2;

        this.rfooder=new egret.Sprite();
        this.rfooder.addChild(ResMgr.getRes("base#mgFooder"));
        this.model.addChild(this.rfooder);
        this.rfooder.x=80;
        this.rfooder.y=-80;
        this.rfooder.scaleX=this.rfooder.scaleY=2;

        this.txt_name=UiHelper.createTxt({text:this.v.name,width:img.width,x:0-img.width/2,y:0-img.height-50,font:"楷体",color:0xffffff,size:160,align:"center",height:300});
        UiHelper.filter(this.txt_name,0x000000,0.5,5,5,50,5);
        this.model.addChild(this.txt_name);
    }
    public moveTo(p:egret.Point){
        this.to=p;
        Timing.addEnterFrame("movePlayer"+this.v.name,this.move,this);
    }
    private move(){
        let s:number=egret.Point.distance(new egret.Point(this.x,this.y),this.to);
        let t:number=s/this.v.speed;
        let speedx:number=(this.to.x-this.x)*0.001*Timing.s/t;
        let speedy:number=(this.to.y-this.y)*0.001*Timing.s/t;
        this.x+=speedx;
        this.y+=speedy;
        this.walk();
        if(Math.abs(s)<=1){
            Timing.removeListen("movePlayer"+this.v.name);
            this.stand();
        }
        let n:number=Math.round(Math.random()*100);
        if(n==2){
            console.log("ttt");
            Tips.create("我要长胖，我不要变瘦！",this.stage,0,this.y);
        }
    }
    public stand(){
        this.lfooder.visible=true;
        this.rfooder.visible=true;
    }
    public walk(){
        if(this.fooderFix>0){
            this.fooderFix--;
            return;
        }
        this.lfooder.visible=this.fooderStatus;
        this.rfooder.visible=!this.fooderStatus;
        this.fooderStatus=!this.fooderStatus;
        this.fooderFix=3;
    }
    public jump(){

    }
}