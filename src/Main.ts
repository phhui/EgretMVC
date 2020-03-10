class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        new Register();
        this.stage.addChild(Loading.self);
        EventHelper.addListener(SysCmd.CONFIG_COMPLETE,this.createGame,this);
        EventHelper.call(SysCmd.LOAD_CONFIG);
    }
    private createGame() {
        let lm:LayerMgr=new LayerMgr();
        this.addChild(lm);
        EventHelper.call(MapsCmd.SHOW_WINDOW);
    }
}