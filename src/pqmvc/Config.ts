class Config{
	static urlList: Array<any> = [];
	public static configDict:any={};
	constructor()
	{
	}
	static getConfig(name:string){
		return this.configDict[name];
	}
} 