class Tips extends egret.Sprite {
    private str: string = "";
    private txt: egret.TextField;
    private fx: number = 1;
    private defY: number = 0;
    constructor() {
        super();
    }
    public static create(text: string, panel: egret.Sprite, x: number, y: number) {
        var tip: Tips = new Tips();
        tip.show(text,panel,x,y);
    }
    public show(text: string, panel: egret.Sprite, x: number, y: number) {
        this.str = text;
        this.x = x;
        this.y = y;
        panel.addChild(this);
        this.init();
    }
    private init() {
        this.txt = UiHelper.self.createTxt({ text: this.str, width: 500, height: 30, size: 30, color: 0xff0000, parent: this });
        this.txt.x = 0 - this.txt.textWidth / 2;
        this.alpha = 0;
        this.addEventListener(egret.Event.ENTER_FRAME, this.showTip, this);
        //TweenLite.to(this.txt, 1, { x: this.x, y: this.y - 100, alpha: 1, onComplete: this.updateTxt });
    }
    private showTip(e: egret.Event) {
        if (this.txt.y > - 200) {
            this.alpha += 0.02;
        } else {
            this.alpha -= 0.01;
        }
        this.txt.y -= 4;
        if (this.txt.y < - 400) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.showTip, this);
            this.parent.removeChild(this);
            this.txt = null;
        }
    }
}