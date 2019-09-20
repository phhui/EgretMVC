class PlayerView extends PqView{
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
        v.id="5201314";
        v.sex=2;
        v.talent=100;
        v.atk=99;
        v.blood=999999;
        v.defense=999999;
        v.agility=99;
        v.height=172;
        v.weight=120;
        v.speed=99;
        v.strength=9999;
        this.p=new Player(v);
        this.p.x=300;
        this.p.y=400;
        this.addChild(this.p);
    }
}