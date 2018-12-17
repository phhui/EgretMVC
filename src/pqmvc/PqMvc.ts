class PqMvc extends egret.Sprite{
	private dh: DataHealper;
	constructor(){
       super();
	}
	public addListen(event:string,func:Function,target:any){
		EventHelper.addListener(event,func,target);
	}
	public call(event:string,...args){
		args.unshift(event);
		EventHelper.call.apply(EventHelper,args);
	}
	public removeListen(event:string){
		EventHelper.remove(event);
	}
	public shareData(key: string, data: any): void{
       this.dh.shareData(key, data);
	}
    public getData(key: string): any{
       return this.dh.getData(key);
	}
}