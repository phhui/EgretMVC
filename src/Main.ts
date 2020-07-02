class Main extends egret.DisplayObjectContainer {
    private video:egret.Video;
    private n:number=0;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        new Register();
        this.stage.addChild(Loading.self);
        EventHelper.addListener(SysCmd.CONFIG_COMPLETE,this.createGame,this);
        EventHelper.call(SysCmd.LOAD_CONFIG);
        
    }
    private createGame() {
        let lm:LayerMgr=new LayerMgr();
        this.addChild(lm);
        // EventHelper.call(MapsCmd.SHOW_WINDOW);
        //test.getName();
        //LogMgr.log("测试日志");
        //Timing.addListen("afdsafdas",100,this.logTest,this);
        //this.testVideo();
        let url="aa.bb.cc";
        url+="?"+HttpHelper.paramParse({"name":"abc","sex":"man","age":1});
        url=url.replace("?&","?");
        console.log(url);
    }
    private paramParse(param:any,key:string=null,encode:boolean=true){
        if(param==null) return '';
        let paramStr = '';
        let t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += HttpHelper.paramParse(param[i], k, encode);
            }
        }
        return paramStr;
    }
    private logTest(){
        Log.log("test"+this.n);
        this.n++;
    }
    private testVideo(){
        this.video = new egret.Video();
        this.video.x = 0;                       //设置视频坐标x
        this.video.y = 0;                       //设置视频坐标y
        this.video.width = 640;                 //设置视频宽
        this.video.height = 320;                //设置视频高
        this.video.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
        this.video.load("http://120.132.17.138:8111/t0_1.mp4");
        this.addChild(this.video);              //将视频添加到舞台
        //监听视频加载完成
        this.video.once(egret.Event.COMPLETE,this.onLoad,this);
        //监听视频加载失败
        this.video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
        setTimeout(()=>{this.video.play();},1000);
    }
    private onLoad(e: egret.Event) {
        //this.video.play();
    }
    private onLoadErr(e: egret.Event) {
        console.log("video load error happened");
    }
    public play(e: egret.TouchEvent) {
        this.video.play();
    }
}