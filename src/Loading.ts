class Loading extends egret.Sprite {
    private panel: egret.Sprite;
    private txt: egret.TextField;
    private loadValue: string = "";
    private pointStr: string = "......";
    private isClose: boolean = false;
    private actionSpeed: number = 10;
    private actionCount: number = 0;
    private static _self:Loading;
    constructor() {
        super();
        this.init();
    }
    static get self():Loading{
        if(!this._self)this._self=new Loading();
        return this._self;
    }
    private init() {
        this.panel = new egret.Sprite();
        this.addChild(this.panel);
        this.txt = UiHelper.self.createTxt({ text: "loading......", width: 200, height: 30, color: 0xffffff });
        this.panel.addChild(this.txt);
        this.alpha = 0;
    }
    public show() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.round, this);
    }
    public close() {
        this.isClose = true;
        this.actionCount = 0;
    }
    public onProgress(current: number, total: number): void {
        this.loadValue = (current/total).toString();
    }
    public update(val: string) {
        this.loadValue = val;
    }
    private round(e: egret.Event) {
        if (this.isClose) {
            this.alpha -= 0.01;
            if (this.alpha <= 0) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.round, this);
                if (this.parent) this.parent.removeChild(this);
                this.isClose = false;
            }
        } else {
            if (this.alpha < 1) this.alpha += 0.01;
        }
        this.actionCount++;
        if (this.actionCount % this.actionSpeed != 0) return;
        this.txt.text = "loading" + this.pointStr + "    " + this.loadValue + (this.loadValue.length>0?"%":"");
        if (this.pointStr.length < 6) {
            this.pointStr += ".";
        } else this.pointStr = ".";
        
        this.x = this.stage.stageWidth / 2 - this.width / 2;
        this.y = this.stage.stageHeight / 2 - 15;
    }
}