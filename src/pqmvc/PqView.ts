class PqView extends PqMvc {
    public uiDict: Object = {};
    protected typeFunc: Object;
    protected moduleName:string;
    /*模块资源名称，用于获取配置创建UI界面 */
    constructor(_moduleName:string) {
        super();
        this.moduleName=_moduleName;
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
        if (!this.moduleName||(!Config.getConfig(this.moduleName)&&!RES.getRes(this.moduleName))) {
            console.log(this.moduleName+" is not found");
            return;
        }
        var config=Config.configDict[this.moduleName]||RES.getRes(this.moduleName);
        var n: number = config.length;
        for (var i: number = 0; i < n; i++) {
            var v: ConfigVo = config[i];
            var obj: any;
            if(v.url)ResMgr.map[this.moduleName+"_"+v.name]=ResMgr.getResByUrl(v.url).Texture;
            if (this.typeFunc[v.category]) obj = this.typeFunc[v.category][0].apply(this.typeFunc[v.category][1], [v]);
            else continue;
            if (v.name) {
                obj.name = v.name;
                this.uiDict[v.name] = obj;
            }
            obj.x = v.x||0;
            obj.y = v.y||0;
            obj.scaleX=(v.scaleX||1);
            obj.scaleY=(v.scaleY||1);
            if(typeof(v.alpha) != "undefined")obj.alpha = v.alpha;
            else obj.alpha=1;
            if(v.width)obj.width=v.width;
            if(v.height)obj.height=v.height;
            obj.rotation=v.rotation||0;
            if (v.mask) obj.mask = this.uiDict[v.mask];
            if (v.visible == false) obj.visible = false;
            if (!v.parent||v.parent=="") this.addChild(obj);
            else this.uiDict[v.parent].addChild(obj);
        }
    }
    protected parsingPanel(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        sp.name = v.name;
        if (v.url) {
            var img: egret.Bitmap = (v.url?ResMgr.getResByUrl(v.url):ResMgr.getImg(v.sheet));
            img.pixelHitTest = true
            sp.addChild(img);
        }
        return sp;
    }
    protected parsingImg(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        var img: egret.Bitmap = (v.url?ResMgr.getResByUrl(v.url):ResMgr.getImg(v.sheet));
        img.pixelHitTest = true
        img.smoothing=true;
        sp.addChild(img);
        img.x = 0-img.width * (v.focusX||0);
        img.y = 0-img.height * (v.focusY||0);
        sp.touchChildren = false;
        sp.touchEnabled = false;
        sp.alpha = (v.alpha||1);
        if (v.visible==false) sp.visible = false;
        return sp;
    }
    protected parsingBtn(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        if(v.url||v.sheet){
            var bm: egret.Bitmap = (v.url?ResMgr.getResByUrl(v.url):ResMgr.getImg(v.sheet));
            bm.pixelHitTest = true;
            sp.addChild(bm);
        }
        sp.touchChildren = false;
        sp.touchEnabled = true;
        return sp;
    }
    protected parsingTxt(v: ConfigVo): egret.TextField {
        var txt: egret.TextField = UiHelper.self.createTxt({ text: v.text, type: v.type,font:v.font,displayAsPassword:v.isPassword, align: v.align ? v.align : "left",bold:v.bold, color: v.color,border:v.border, size: v.size ? v.size : 18, touchEnabled: v.touchEnabled ? v.touchEnabled : false, width: v.width ? v.width : 120, height: v.height ? v.height : 30 });
        //if(v.filter)UiHelper.filter(txt,0x9e5012,0.5,3,3,10);
        return txt;
    }
}