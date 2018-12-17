class TweenLite {
    constructor() {
        
    }
    static to(obj:any,time:number,params:any=null) {
        var tw: egret.Tween = egret.Tween.get(obj);
        tw.to(params, time, params ? params.ease : null);
        if (params && params.delay) {
            params.delay = null;
            tw.wait(params.delay);
        }
        if (params && params.onComplete)tw.call(params.onComplete,params.target,params.onCompleteParams);
    }
} 