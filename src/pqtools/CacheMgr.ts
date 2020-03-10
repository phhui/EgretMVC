class CacheMgr{
    private cacheKey:string;
    static self:CacheMgr=new CacheMgr();
    constructor(){
    }
	public setCacheKey(key:string){
		if(this.cacheKey)throw new Error("cacheKey已设置，不允许重复设置");
		this.cacheKey=key;
	}
    public removeCacheKey(){
        this.cacheKey=null;
    }
    /**缓存数据 */
    public saveCache(key:string,data:any,period:number=0){
        this.save_cache(key,data,period);
    }
    /**获取缓存 */
    public getCache(key:string){
        return this.get_cache(key);
    }
    /**移除缓存 */
    public removeCache(key:string){
        egret.localStorage.removeItem(key);
    }
    /**----【缓存用户数据】----    
     * saveUserCache(缓存名称，缓存内容，缓存有效期(分钟))    
     * 该方法需要确保已设置cacheKey(用户ID)，用于区分不同用户或ID的数据 */
    public saveUserCache(key:string,data:any,period:number=0){
        if(!this.cacheKey){
            this.saveCache(key,data);
            console.log("未设置用户标识符，无法保存用户数据，请先调用 setCacheKey方法传入标识符！");
        }
        else this.save_cache(this.cacheKey+"_"+key,data,period);
    }
    /**----【获取用户缓存数据】---- */
    public getUserCache(key:string){
        return this.get_cache(this.cacheKey+"_"+key);
    }
    /**移除用户数据 */
    public removeUserCache(key:string){
        egret.localStorage.removeItem(this.cacheKey+"_"+key);
    }
    private save_cache(key:string,data:any,period:number=0){
        egret.localStorage.setItem(key, period>0?JSON.stringify({t:new Date().getTime(),data:data,period:period}):JSON.stringify(data));
    }
    private get_cache(key:string){
        try{
            var data = JSON.parse(<string>egret.localStorage.getItem(key));
            if(data.period!=0)return data;
            let t:number=new Date().getTime();
            if(parseInt(data.period)!=0&&t-parseInt(data.t)>parseInt(data.period)*60*1000){
                this.removeUserCache(key);
                return null;
            }
            return data.data;
        }catch(err){
            return egret.localStorage.getItem(key);
        }
    }
    public clearCache(){
        egret.localStorage.clear();
    }
}