class ResMgr {
    static map: Object = {};
    constructor() {
    }
    static getRes(name:string):egret.Bitmap{
        if (!RES.getRes(name))throw new Error("资源  "+name+"  不存在！");
        return new egret.Bitmap(RES.getRes(name));
    }
    /**获取透明区域穿透资源 */
    static getPixelHitRes(name:string):egret.Bitmap{
        if (!RES.getRes(name))throw new Error("资源  "+name+"  不存在！");
        var img: egret.Bitmap = ResMgr.getRes(name);
        img.pixelHitTest = true;
        img.smoothing=true;
        return img;
    }
    static getSheet(name:string,moduleName:string=""):egret.Bitmap{
        let index:number=name.indexOf('#');
        let key:string=name.substr(0,index);
        let subkey:string=name.substr(index+1);
        let t= ResMgr.map[moduleName+"_"+key];
        let texture:egret.Texture=(t&&t.getTexture(subkey))||RES.getRes(name);
        return new egret.Bitmap(texture);
    }
    static getSound(nameOrUrl:string):egret.Sound{
        return RES.getRes(nameOrUrl)||ResMgr.map[nameOrUrl];
    }
    static getResByUrl(url: string): any {
        if (ResMgr.map[url] == null&&RES.getRes(url)){
            console.log("资源不存在>>"+url);
            return new egret.Bitmap();
        }
        var bm: egret.Bitmap = new egret.Bitmap;
        bm.texture = ResMgr.map[url]||RES.getRes(url);
        return bm;
    }
    static cutResFromCache(modeuleName:string,name:string,rect:egret.Rectangle):egret.Bitmap{
        name=modeuleName+"_"+name;
        if (ResMgr.map[name] == null) throw new Error("资源不存在>>"+name);
        var bm: egret.Bitmap = new egret.Bitmap;
        bm.texture = ResMgr.map[name];
        let $drawTexture: egret.RenderTexture = new egret.RenderTexture();
        $drawTexture.drawToTexture( bm , rect , 1 );
        bm.texture = $drawTexture;
        return bm;
    }
    static cutResFromRes(name:string,rect:egret.Rectangle):egret.Bitmap{
        var texture: egret.Texture = RES.getRes(name);
        if (texture == null)throw new Error("资源  "+name+"  不存在！");
        var bm: egret.Bitmap = new egret.Bitmap;
        bm.texture = texture;
        let $drawTexture: egret.RenderTexture = new egret.RenderTexture();
        $drawTexture.drawToTexture( bm , rect , 1 );
        bm.texture = $drawTexture;
        return bm;
    }
}