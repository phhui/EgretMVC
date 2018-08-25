class LoadMgr extends PqMvc{
    private loadList:Array<any>=[];
    private loadIndex:number=0;
    constructor(){
        super();
        this.registerEvent();
    }
    private registerEvent(){
        this.addListen(SysCmd.LOAD_CONFIG,this.loadConfig,this);
        this.addListen(SysCmd.LOAD_MODULE_RES,this.loadModule,this);
    }
    private async loadConfig(){
        Loading.self.show();
        await RES.loadConfig("resource/default.res.json", "resource/");
        await RES.loadGroup("preload", 0, Loading.self);
        Loading.self.close();
    }
    private loadModule(event:string,name:string=null){
        Loading.self.show();
        this.loadList.push(name);
        if(this.loadList.length==1){
            this.load();
        }
        Loading.self.close();
    }
    private load(){
        let config=RES.getRes(this.loadList[0]);
        RES.getResByUrl(config[this.loadIndex].url,this.resLoaded,this,config[this.loadIndex].type);
    }
    private resLoaded(e:any,url:string){
        ResMgr.map[url]=e;
        this.loadIndex+=1;
        let config=RES.getRes(this.loadList[0]);
        if(this.loadIndex>=config.length){
            this.loadIndex=0;
            this.call(this.loadList[0]);
            this.loadList.shift();
            if(this.loadList.length>0){
                this.load();
            }
        }else{
            this.load();
        }
    }
}