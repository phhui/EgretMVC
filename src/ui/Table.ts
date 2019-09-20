class Table extends egret.DisplayObject{
    constructor(){
        super();
    }
    public bindData(data:any){

    }
    private createRow(data:Array<any>){
        for(let i:number=0;i<data.length;i++){
            let txt:egret.TextField=UiHelper.createTxt({text:data[i],color:0xfffff,size:14,width:60,height:20});
            
        }
    }
}