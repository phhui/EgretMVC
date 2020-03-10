class PqMvc extends egret.Sprite{
	private dh: DataHelper;
	constructor(){
       super();
	}
	public addListen(event:string,func:Function,target:any){
		EventHelper.addListener(event,func,target);
	}
	public call(event:string,...args){
		args.unshift(event);
		EventHelper.call.apply(EventHelper,args);
		//EventHelper.call(event,param);
	}
	public removeListen(event:string,func:Function=null,target:any=null){
		EventHelper.remove(event,func,target);
	}
	public shareData(key: string, data: any): void{
       this.dh.shareData(key, data);
	}
    public getData(key: string): any{
       return this.dh.getData(key);
	}
}