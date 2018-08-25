class PqView extends PqMvc {
    public uiDict: Object = {};
    protected typeFunc: Object;
    constructor() {
        super();
        this.typeFunc = {};
        this.init();
        this.addType("panel", this.parsingPanel, this);
        this.addType("img", this.parsingImg, this);
        this.addType("btn", this.parsingBtn, this);
        this.addType("txt", this.parsingTxt, this);
        this.createVeiew();
        this.execute();
    }
    protected init(): void {

    }
    protected execute(): void {

    }
    protected addType(type: string, func: Function, target: any): void {
        this.typeFunc[type] = [func, target];
    }
    protected createVeiew(): void {
        if (!Config.configList) return;
        var n: number = Config.configList.length;
        for (var i: number = 0; i < n; i++) {
            var v: ConfigVo = Config.configList[i];
            var obj: any;
            if (this.typeFunc[v.category]) obj = this.typeFunc[v.category][0].apply(this.typeFunc[v.category][1], [v]);
            else continue;
            if (v.name) {
                obj.name = v.name;
                this.uiDict[v.name] = obj;
            }
            obj.x = v.x;
            obj.y = v.y;
            obj.alpha = v.alpha ? v.alpha : 1;
            if (v.mask) obj.mask = this.uiDict[v.mask];
            if (v.visible == "false") obj.visible = false;
            if (v.targetPanel == "root") this.addChild(obj);
            else this.uiDict[v.targetPanel].addChild(obj);
        }
    }
    protected parsingPanel(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        sp.name = v.name;
        return sp;
    }
    protected parsingImg(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        var img: egret.Bitmap = ResMgr.getImg(v.name);
        img.pixelHitTest = true
        sp.addChild(img);
        img.x = 0-img.width * v.focusX;
        img.y = 0-img.height * v.focusY;
        sp.touchChildren = false;
        sp.touchEnabled = false;
        return sp;
    }
    protected parsingBtn(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        var bm: egret.Bitmap = ResMgr.getImg(v.name);
        bm.pixelHitTest = true
        sp.addChild(bm);
        sp.touchChildren = false;
        sp.touchEnabled = true;
        return sp;
    }
    protected parsingTxt(v: ConfigVo): egret.TextField {
        var txt: egret.TextField = UiHelper.self.createTxt({ text: v.text, type: v.type, align: v.align ? v.align : "left", color: v.color, size: v.size ? v.size : 18, touchEnabled: v.touchEnabled ? v.touchEnabled : false, width: v.width ? v.width : 120, height: v.height ? v.height : 30 });
        return txt;
    }
}