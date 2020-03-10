class Timing{
    static frame:number=30;
    static farmeCount:number=0;
    static s: number = 50;//计时间隔(毫秒)
    static t: egret.Timer;
    static dict: Object;
    static inited: Boolean = false;
    static sp:egret.Sprite;
    constructor() {
    }
    static init() {
        this.dict = {};
        Timing.sp=new egret.Sprite();
        Timing.sp.addEventListener(egret.Event.ENTER_FRAME,this.enterframe,this);
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
        if (interval < this.s) interval = this.s;
        this.dict[key] = { key:key,func: callBack, target: target, param: param, time:this.t.currentCount, interval: interval, execNum: execNum };
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
        this.dict[key] = { key:key,func: callBack, target: target, param: param, time: this.t.currentCount, interval: this.s, execNum: execNum };
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
    static sys_remove_all_listen(){
        this.dict={};
    }
    static enterframe(e:egret.Event){
        this.farmeCount++;
        
    }
    static run(): void {
        for (let i in this.dict) {
            let o:any = this.dict[i];
            if (o != null && o.func != null && (this.t.currentCount - o.time) * this.s >= o.interval) {
                if(o.execNum!=-1)o.execNum--;
                if (o.execNum ==0) delete this.dict[o.key];
                if (o.param != null) o.func.apply(o.target,[o.param]);
                else o.func.apply(o.target,null);
                o.time = this.t.currentCount;
            }
        }
    }
} 