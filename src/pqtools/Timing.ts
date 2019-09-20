class Timing {
    static s: number = 17;//计时间隔(毫秒) 17为最佳平滑移动间隔
    static t: egret.Timer;
    static count: number = 0;
    static dict: Object;
    static inited: Boolean = false;
    constructor() {
    }
    static init() {
        this.dict = {};
        this.t = new egret.Timer(this.s, 0);
        this.t.addEventListener(egret.TimerEvent.TIMER, this.run, this);
        this.t.start();
        this.inited = true;
    }
    /**
     *创建计时器
     * @param key 名字
     * @param interval 间隔(秒)
     * @param callBack 回调方法
     * @param param 回调参数
     *
     */
    static addListen(key: string, interval: number, callBack: Function, target: any, param: any = null, execNum: number = -1): void {
        if (!this.inited) this.init()
        if (this.dict[key]) return;
        if (interval * 1000 < this.s) interval = this.s*0.001;
        this.dict[key] = { key:key,func: callBack, target: target, param: param, time: this.count, interval: interval * 1000, execNum: execNum };
    }
    /**
     *创建计时器
     * @param key 名字
     * @param interval 间隔(秒)
     * @param callBack 回调方法
     * @param param 回调参数
     *
     */
    static addEnterFrame(key: string, callBack: Function, target: any, param: any = null, execNum: number = -1): void {
        if (!this.inited) this.init()
        if (this.dict[key]) return;
        this.dict[key] = { key:key,func: callBack, target: target, param: param, time: this.count, interval: this.s, execNum: execNum };
    }
    static setTimeOut(key: string, interval: number, callBack: Function, target: any, param: any = null): void {
        Timing.addListen(key, interval, callBack, target, param, 1);
    }
    /**
     *删除指定计时
     * @param key 名字
     *
     */
    static removeListen(key: string): void {
        this.dict[key] = null;
    }
    static run(): void {
        this.count++;
        for (var i in this.dict) {
            var o = this.dict[i];
            if (o != null && o.func != null && (this.count - o.time) * this.s >= o.interval) {
                if (o.param != null) o.func.apply(o.target,[o.param]);
                else o.func.apply(o.target,null);
                o.time = this.count;
                if(o.execNum!=-1)o.execNum--;
                if (o.execNum ==0) delete this.dict[o.key];
            }
        }
    }
} 