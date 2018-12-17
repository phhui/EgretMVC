class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        egret.ImageLoader.crossOrigin = "*";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame();
    }
    private async runGame() {
        await this.loadResource();
        this.createGame();
    }
    private async loadResource() {
        try {
            this.stage.addChild(Loading.self);
            Loading.self.x = this.stage.stageWidth / 2 - Loading.self.width / 2;
            Loading.self.y = this.stage.stageHeight / 2 - 15;
            Loading.self.show();
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, Loading.self);
        }
        catch (e) {
            console.error(e);
        }
    }
    protected async createGame() {
        this.addChild(Loading.self);
        let lm:LayerMgr=new LayerMgr();
        this.addChild(lm);
        new Register();
        EventHelper.call(HomeCmd.SHOW_WINDOW);
    }
}