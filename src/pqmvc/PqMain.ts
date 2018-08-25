class PqMain extends egret.DisplayObjectContainer {
    private game: any;
    private curIndex: number = 0;
    private loadingTxt: egret.TextField;
    private loading: Loading;

    protected createChildren(): void {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
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
        this.initRES();
    }
    private async loadResource() {
        try {
            this.loading = new Loading();
            this.stage.addChild(this.loading);
            this.loading.x = this.stage.stageWidth / 2 - this.loading.width / 2;
            this.loading.y = this.stage.stageHeight / 2 - 15;
            this.loading.show();
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, this.loading);
            this.loading.close();
        }
        catch (e) {
            console.error(e);
        }
    }
    protected async initRES() {
        this.initGame();
    }
    protected initGame() {
        this.game = new PqGame();
        this.addChild(this.game);
    }
}