class ResMgr {
    static map: Object = {};
    constructor() {
    }
    static getImg(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        if (texture == null)throw new Error("资源  "+name+"  不存在！");
        result.texture = texture;
        return result;
    }
    static getResByName(name:string){
        return this.getResByUrl(name);
    }
    static getResByUrl(url: string): any {
        if (ResMgr.map[url] == null) throw new Error("资源不存在>>"+url);
        var bm: egret.Bitmap = new egret.Bitmap;
        bm.texture = ResMgr.map[url];
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