class ConfigVo{
	public id: string;
    /**父级容器**/
    public parent: string;
    /**资源路径(如果是纹理则使用sheet,url留空) */
	public url: string;
    /**纹理路径(和url只能用一个，优先使用URL) */
    public sheet:string;
	public name: string;
	public x: number;
	public y: number;
	public alpha: number=1;
	public category: string;
    public key: string;
    public mask: string;
	public value: string;
    public visible: boolean;
    /**旋转角度 */
    public rotation:number;
    /**ˮ焦点位置0-1**/
    public focusX: number = 0;
    /**焦点位置0-1**/
    public focusY: number=0;
    public scaleX:number;
    public scaleY:number;
    public width: number;
    public height: number;
    public touchEnabled: boolean;

    /**文本框特有属性 */
    public font:string;
    public text: string;
    public border:boolean;
    public align: string;
    public color: any;
    public bold:boolean;
    public size: number;
    public type: string;
    public filter:any;
    public isPassword:boolean;
    constructor(){
    }
} 