class MapsController extends BaseController{
    static NAME:string="MapsController";
    private pxy:MapsProxy;
    private bgDict:Object;
    constructor(){
        super();
        this.target = this;
    }
    public execute(param:Object=null,type:string=null){
        switch(type){
            case MapsCmd.SHOW_WINDOW:
                this.showWindow();
            break;
            case MapsCmd.CLOSE_WINDOW:
                this.closeWindow();
            break;
            case MapsCmd.MODULE_NAME:
                this.initView();
            break;
        }
    }
    private initView(){
        this.ui=new MapsView();
        this.inited=true;
        this.showWindow();
        this.addEvent();
    }
    private showWindow(){
        if(!this.inited){
            this.call(SysCmd.LOAD_MODULE_RES,MapsCmd.MODULE_NAME);
            return;
        }
        this.call(SysCmd.ADD_TO_STAGE,this.ui);
        //this.createMap();
        this.call(PlayerCmd.SHOW_WINDOW);
    }
    private closeWindow(){

    }
    private createMap(){
        this.ui.removeChildren();
        MapsCreater.create(this.ui,this.ui.stage.stageWidth,this.ui.stage.stageHeight);
    }
    private addEvent(){
        this.ui.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touch,this);
    }
    private touch(e:egret.TouchEvent){
        this.call(MapsCmd.TOUCH,new egret.Point(e.localX,e.localY));
    }
}