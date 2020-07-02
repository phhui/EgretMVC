class BaseView extends PqView{
    constructor(name:string){
        super(name);
    }
    public createPanel(res:string){
        let config=RES.getRes(res);
        let panel:PqPanel=new PqPanel();
        var n: number = config.length;
        for (var i: number = 0; i < n; i++) {
            var v: ConfigVo = config[i];
            panel.configDict[v.id]=v;
            var obj: any;
            if (this.typeFunc[v.category]) obj = this.typeFunc[v.category][0].apply(this.typeFunc[v.category][1], [v]);
            else continue;
            if(v.category=="action")continue;
            if (v.id) {
                obj.name = v.id;
                panel.uiDict[v.id] = obj;
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
            if (v.mask) obj.mask = panel.uiDict[v.mask];
            if (v.visible == false) obj.visible = false;
            if (!v.pid||v.pid=="") panel.addChild(obj);
            else panel.uiDict[v.pid].addChild(obj);
        }
        return panel;
    }
    protected parsingPqBtn(v: ConfigVo): PqBtn {
        var btn:PqBtn = new PqBtn();
        if(v.url||v.source){
            var bm: egret.Bitmap = (v.url?PqResMgr.getResByUrl(v.url):PqResMgr.getSheet(v.source,this.moduleName));
            bm.pixelHitTest = true;
            btn.addChild(bm);
        }
        btn.defSkin=v["defSkin"];
        btn.selectSkin=v["selectSkin"];
        btn.touchChildren = false;
        btn.touchEnabled = true;
        btn.selected=v["selected"];
        return btn;
    }
    protected init(){
        this.addType("pqBtn",this.parsingPqBtn,this);
    }
}