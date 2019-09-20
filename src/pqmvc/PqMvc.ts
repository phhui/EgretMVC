class PqMvc extends egret.Sprite{
	private dh: DataHealper;
	constructor(){
       super();
	}
	public addListen(event:string,func:Function,target:any){
		EventHelper.addListener(event,func,target);
	}
	public call(event:string,param:any=null){
		EventHelper.call(event,param);
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