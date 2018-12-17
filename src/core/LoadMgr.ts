class LoadMgr extends PqMvc{
    private loadList:Array<any>=[];
    private loadIndex:number=0;
    private curList:Array<any>;
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
        //console.log("load module>>"+name);
        Loading.self.show();
        this.loadList.push(name);
        if(this.loadList.length==1){
            this.getConfig();
        }
    }
    private getConfig(){
        Config.configDict[this.loadList[0]]=RES.getRes(this.loadList[0]);
        var list=RES.getRes(this.loadList[0]);
        this.curList=[];
        var n: number = list.length;
        for (var i: number = 0; i < n; i++) {
            if(list[i].sheet)continue;
            if (list[i].url)this.curList.push(list[i]);
        }
        if(this.curList.length>0){
            this.load();
        }else{
            this.loadNextList();
        }
    }
    private load(){
        var url:string=this.curList[this.loadIndex].url;
        //console.log("loading>>"+this.loadIndex+"---"+url);
        RES.getResByUrl(url,this.resLoaded,this,this.curList[this.loadIndex].type);
    }
    private resLoaded(e:any,url:string){
        ResMgr.map[url]=e;
        this.loadIndex+=1;
        if(this.loadIndex>=this.curList.length){
            this.loadNextList();
        }else{
            this.load();
        }
    }
    private loadNextList(){
            this.loadIndex=0;
            this.call(this.loadList[0]);
            this.loadList.shift();
            if(this.loadList.length>0){
                this.getConfig();
            }else{
                Loading.self.close();
            }
    }
}