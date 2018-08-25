class View extends PqView {
    constructor() {
        super();
    }
    protected init() {
        
    }
    protected execute(): void {
        this.addChild(ResMgr.getImg("grass_jpg"));
        //this.addChild(ResMgr.getResByUrl("resource/assets/grass.jpg"));
    }
    protected parsingPanel(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        sp.name = v.name;
        if (v.url) {
            var img: egret.Bitmap = ResMgr.getResByUrl(v.url);
            img.pixelHitTest = true
            sp.addChild(img);
        }
        return sp;
    }
    protected parsingImg(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        var img: egret.Bitmap = ResMgr.getResByUrl(v.url);
        img.pixelHitTest = true;
        sp.addChild(img);
        img.x = 0-img.width * v.focusX;
        img.y = 0-img.height * v.focusY;
        sp.touchChildren = false;
        sp.touchEnabled = false;
        sp.alpha = v.alpha;
        if (v.visible=="false") sp.visible = false;
        return sp;
    }
    protected parsingBtn(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        var img: egret.Bitmap = ResMgr.getResByUrl(v.url);
        img.pixelHitTest = true;
        sp.addChild(img);
        sp.touchChildren = false;
        sp.touchEnabled = true;
        return sp;
    }
} 