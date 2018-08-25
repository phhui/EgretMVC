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
    static getResByUrl(url: string): any {
        if (ResMgr.map[url] == null) throw new Error("资源不存在");
        var bm: egret.Bitmap = new egret.Bitmap;
        bm.texture = ResMgr.map[url];
        return bm;
    }
} 