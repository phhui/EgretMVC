class MapsProxy extends BaseProxy{
    static NAME:string="MapsProxy";
    public size:number=500;
	public execute(param:any=null, type:string=null):void{
		switch(type){
			case MapsCmd.INIT_DATA:
				this.initData();
				break;
		}
	}
    private initData(){

    }
	public getLocation(){
		var x:number=Math.random()*10000;
		var y:number=Math.random()*10000;
		return [888,8888];
	}
	public getRect(st:egret.Stage){
		if(st==null)return;
        var location:Array<any>=this.getLocation();
        var row:number=Math.round(location[0]/this.size);
        var col:number=Math.round(location[1]/this.size);
		var rowNum:number=Math.ceil((st.stageWidth-this.size)/2/this.size);
		var colNum:number=Math.ceil((st.stageHeight-this.size)/2/this.size);
        var startRow:number=row-rowNum-1;
        var startCol:number=col-colNum-1;
		return new egret.Rectangle(startRow,startCol,rowNum*2+2,colNum*2+2);
	}
}