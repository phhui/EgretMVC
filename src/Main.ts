class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }
    private async runGame() {
        await this.loadResource();
        this.createGame();
    }
    private async loadResource() {
        try {
            let loading = new Loading();
            this.stage.addChild(loading);
            loading.x = this.stage.stageWidth / 2 - loading.width / 2;
            loading.y = this.stage.stageHeight / 2 - 15;
            loading.show();
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loading);
            loading.close();
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
        EventHelper.call(MapsCmd.SHOW_WINDOW);
    }
}