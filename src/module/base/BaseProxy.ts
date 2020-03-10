class BaseProxy extends PqProxy{
    static NAME:string="BaseProxy";
    protected get(url: string, param: any, onComplete: Function, target: any, errorFunc?) {
        HttpHelper.get(url, param, (obj: any) => {
            let data = this.parse(obj);
            onComplete.call(this, data);
        }, target);
    }
    protected post(url: string, param: any, onComplete: Function, target: any, errorFunc?) {
        HttpHelper.post(url, param, (obj: any) => {
            let data = this.parse(obj);
            onComplete.call(this, data);
        }, target);
    }
}