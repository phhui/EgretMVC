class MapsView extends BaseView{
    private btn:eui.Button;
    constructor(){
        super(MapsCmd.MODULE_NAME);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.add,this);
    }
    private add(e:egret.Event){
        this.removeChildren();
        this.btn=new eui.Button();
        this.btn.label="aaaaaaaaaaaaaaaa";
        this.btn.x=50;
        this.btn.y=50;
        this.addChild(this.btn);
    }
    protected init() {
        
    }
    protected execute(): void {
        
    }
}