class PqView extends PqMvc {
    public uiDict: Object = {};
    public configDict:Object={};
    private actionDict:Object={};
    protected typeFunc: Object;
    protected moduleName:string;
    /*模块资源名称，用于获取配置创建UI界面 */
    constructor(_moduleName:string) {
        super();
        this.moduleName=_moduleName;
        this.typeFunc = {};
        this.addType("panel", this.parsingPanel, this);
        this.addType("img", this.parsingImg, this);
        this.addType("btn", this.parsingBtn, this);
        this.addType("dg",this.parssingDg,this);
        this.addType("txt", this.parsingTxt, this);
        this.addType("mtxt", this.parsingMTxt, this);
        this.addType("base64", this.parsingBase64, this);
        this.addType("action",this.parsingAction,this);
        this.init();
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
    protected getModuleRes(name:string):any{
        return ResMgr.map[this.moduleName+"_"+name];
    }
    protected getSheet(name:string):any{
        let index:number=name.indexOf('#');
        let key:string=name.substr(0,index);
        let subkey:string=name.substr(index+1);
        let t= ResMgr.map[this.moduleName+"_"+key];
        let texture:egret.Texture=(t&&t.getTexture(subkey))||RES.getRes(name);
        return new egret.Bitmap(texture);
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
            this.configDict[v.name]=v;
            var obj: any;
            if(v.type=="sound"&&v.url)ResMgr.map[this.moduleName+"_"+v.name]=ResMgr.getSound(v.url);
            else if(v.url&&v.type=="sheet")ResMgr.map[this.moduleName+"_"+v.name]=ResMgr.map[v.url];
            else if(v.url)ResMgr.map[this.moduleName+"_"+v.name]=ResMgr.getResByUrl(v.url).texture;
            else if(v.resName)ResMgr.map[v.name]=RES.getRes(v.resName);
            if (this.typeFunc[v.category]) obj = this.typeFunc[v.category][0].apply(this.typeFunc[v.category][1], [v]);
            else continue;
            if(v.category=="action")continue;
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
            if(v.action)v.action=this.actionDict[v.action]||v.action;
        }
    }
    protected parsingPanel(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        sp.name = v.name;
        if (v.url) {
            var img: egret.Bitmap = (v.url?ResMgr.getResByUrl(v.url):ResMgr.getSheet(v.sheet,this.moduleName));
            img.pixelHitTest = true
            sp.addChild(img);
        }
        if(v.graphicsKey&&v.graphicsVal){
            let key:Array<any>=v.graphicsKey.split(',');
            let val:Array<any>=v.graphicsVal.split(',');
            let obj:any={};
            for(let i:number=0;i<key.length;i++){
                obj[key[i]]=val[i];
            }
            sp.graphics.beginFill(obj["color"]||0x666666,v.alpha);
            switch(obj["type"]){
                case "circle":
                    sp.graphics.drawCircle(obj["x"],obj["y"],obj["radius"]);
                    break;
                case "ellipse":
                    sp.graphics.drawEllipse(obj["x"],obj["y"],obj["width"],obj["height"]);
                    break;
                case "roundrect":
                    sp.graphics.drawRoundRect(obj["x"],obj["y"],obj["width"],obj["height"],obj["ellipsewidth"],obj["ellipseheight"]);
                    break;
                case "roundtrapezoid":
                    let p0:egret.Point=new egret.Point(parseFloat(obj["x0"]),parseFloat(obj["y0"]));
                    let p1:egret.Point=new egret.Point(parseFloat(obj["x1"]),parseFloat(obj["y1"]));
                    let p2:egret.Point=new egret.Point(parseFloat(obj["x2"]),parseFloat(obj["y2"]));
                    let p3:egret.Point=new egret.Point(parseFloat(obj["x3"]),parseFloat(obj["y3"]));
                    UiHelper.drawRoundTrapezoid(sp,[p0,p1,p2,p3],obj["color"],parseFloat(obj["alpha"]),parseFloat(obj["border"]),obj["borderColor"],obj["borderAlpha"],parseFloat(obj["radiusX"]),parseFloat(obj["radiusY"]));
                break;
                case "trapezoid":
                    let pa:egret.Point=new egret.Point(parseFloat(obj["x0"]),parseFloat(obj["y0"]));
                    let pb:egret.Point=new egret.Point(parseFloat(obj["x1"]),parseFloat(obj["y1"]));
                    let pc:egret.Point=new egret.Point(parseFloat(obj["x2"]),parseFloat(obj["y2"]));
                    let pd:egret.Point=new egret.Point(parseFloat(obj["x3"]),parseFloat(obj["y3"]));
                    UiHelper.drawTrapezoid(sp,[pa,pb,pc,pd],obj["color"],parseFloat(obj["alpha"]),parseFloat(obj["border"]),obj["borderColor"],obj["borderAlpha"],parseFloat(obj["radiusX"]),parseFloat(obj["radiusY"]));
                break;
                default:
                    UiHelper.drawRect(sp,obj["x"],obj["y"],obj["width"],obj["height"],obj["border"]||0,obj["borderColor"]||0x000000,obj["color"]||0x000000,obj["alpha"]||0.8);
                    //sp.graphics.drawRect(obj["x"],obj["y"],obj["width"],obj["height"]);
                    break;
            }
            sp.graphics.endFill();
        }
        return sp;
    }
    protected parsingImg(v: ConfigVo): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        var img: egret.Bitmap;
        if(v.resName)img=new egret.Bitmap(RES.getRes(v.resName));
        else if(v.url)img=ResMgr.getResByUrl(v.url);
        else if(v.sheet)img=ResMgr.getSheet(v.sheet,this.moduleName);
        else img=new egret.Bitmap();
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
            var bm: egret.Bitmap = (v.url?ResMgr.getResByUrl(v.url):ResMgr.getSheet(v.sheet,this.moduleName));
            bm.pixelHitTest = true;
            sp.addChild(bm);
        }
        sp.touchChildren = false;
        sp.touchEnabled = true;
        return sp;
    }
    protected parssingDg(v:ConfigVo){
        let dg = DragonHelper.createdb(v.res, v.type||"MovieClip");
        dg.animation.play(v.action||"newAnimation");
        dg.touchEnabled = true;
        dg.touchChildren = false;
        return dg;
    }
    protected parsingTxt(v: ConfigVo): egret.TextField {
        var txt: egret.TextField = UiHelper.createTxt({ text: v.text, type: v.type,font:v.font,displayAsPassword:v.isPassword, align: v.align ? v.align : "left",bold:v.bold, color: v.color,border:v.border, size: v.size ? v.size : 18, touchEnabled: v.touchEnabled ? v.touchEnabled : false, width: v.width ? v.width : 120, height: v.height ? v.height : 30 });
        //if(v.filter)UiHelper.filter(txt,0x9e5012,0.5,3,3,10);
        return txt;
    }
    protected parsingMTxt(v: ConfigVo): PqTextField {
        var txt: PqTextField = UiHelper.createMTxt({ text: v.text,backGround:v.backGround,backGroundColor:v.backGroundColor,borderColor:v.borderColor,tipText:v.tipText, type: v.type,font:v.font,displayAsPassword:v.isPassword, align: v.align ? v.align : "left",bold:v.bold, color: v.color,border:v.border, size: v.size ? v.size : 18, touchEnabled: v.touchEnabled ? v.touchEnabled : false, width: v.width ? v.width : 120, height: v.height ? v.height : 30 });
        //if(v.filter)UiHelper.filter(txt,0x9e5012,0.5,3,3,10);
        return txt;
    }
    protected parsingBase64(v:ConfigVo):egret.Sprite{
        var sp: egret.Sprite = new egret.Sprite();
        var img: egret.Bitmap = new egret.Bitmap();
        var saveImage: HTMLImageElement = new Image;
        saveImage.src = v.data; 
        let tt:egret.Texture=new egret.Texture();
        let bm:egret.BitmapData=new egret.BitmapData(saveImage);
        tt.bitmapData=bm;
        img.texture=tt;
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
    protected parsingAction(v:ConfigVo){
        this.actionDict[v.name]=v.value;
    }
}