class EventHelper{
    static listenList:Object={};
    static addListener(key:string,func:Function,target:any){
        if(this.listenList[key]){
            throw new Error(key+"已有监听存在！");
        }
        this.listenList[key]={key:key,func:func,target:target};
    }
    static remove(key:string){
        if(this.listenList[key]){
            this.listenList[key]=null;
        }
    }
    static call(key:string,param:any=null){
        if(this.listenList[key]){
            let obj=this.listenList[key];
            obj.func.apply(obj.target,[key,param]);
        }else{
            throw new Error("系统中没有针对"+key+"事件的监听！");
        }
    }
    static send(e: any, eventType: Array<any>, func: Array<any>, target: any) {
        var n: number = eventType.length;
        for (var i: number = 0; i < n; i++) {
            if (e.target.name == eventType[i]) {
                func[i].apply(target, [eventType[i], e]);
                return;
            }
        }
	}
}