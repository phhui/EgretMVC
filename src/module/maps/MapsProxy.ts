class MapsProxy extends PqProxy{
    static NAME:string="MapsProxy";
	public execute(param:any=null, type:string=null):void{
		switch(type){
			case MapsCmd.INIT_DATA:
				this.initData();
				break;
		}
	}
    private initData(){

    }
}