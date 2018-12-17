class HomeView extends PqView{
    public item0:egret.Sprite;
    public item1:egret.Sprite;
    public item2:egret.Sprite;
    constructor(){
        super(HomeCmd.MODULE_NAME);
    }
    protected init() {
        
    }
    protected execute(){
        this.createView();
    }
    protected createView(){
        this.item0=this.createItem();
        this.item1=this.createItem();
        this.item2=this.createItem();
        this.item1.x=110;
        this.item2.x=220;
        this.uiDict["box"].addChild(this.item0);
        this.uiDict["box"].addChild(this.item1);
        this.uiDict["box"].addChild(this.item2);
    }
    private createItem(){
        var sp:egret.Sprite=new egret.Sprite();
        var img: egret.Bitmap = ResMgr.getImg("res#lb0");
        img.y=0;
        sp.addChild(img);
        img = ResMgr.getImg("res#lb2");
        img.y=-142;
        sp.addChild(img);
        img = ResMgr.getImg("res#lb1");
        img.y=-284;
        sp.addChild(img);
        img = ResMgr.getImg("res#lb3");
        img.y=-426;
        sp.addChild(img);
        img = ResMgr.getImg("res#lb0");
        img.y=-568;
        sp.addChild(img);
        return sp;
    }
}