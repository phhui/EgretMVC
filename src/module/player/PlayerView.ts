class PlayerView extends BaseView{
    private p:Player;
    constructor(){
        super(PlayerCmd.MODULE_NAME);
        this.createPlayer();
    }
    protected init(){
        
    }
    protected execute():void{
        
    }
    public moveTo(p:egret.Point){
        this.p.moveTo(p);
    }
    private createPlayer(){
        let v:PlayerVo=new PlayerVo();
        v.name="211";
        this.p=new Player(v);
        this.p.x=300;
        this.p.y=400;
        this.addChild(this.p);
    }
}