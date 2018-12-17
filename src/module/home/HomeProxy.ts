class HomeProxy extends PqProxy{
    static NAME:string="HomeProxy";
	public execute(param:any=null, type:string=null):void{
		switch(type){
			case HomeCmd.INIT_DATA:
				this.initData();
				break;
		}
	}
    private initData(){

    }
}