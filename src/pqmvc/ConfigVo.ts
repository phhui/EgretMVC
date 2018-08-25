class ConfigVo{
	public id: string;
	public url: string;
	public name: string;
	public x: number;
	public y: number;
	public alpha: number=1;
    public type: string;
    public color: any;
	public category: string;
    public key: string;
    public size: number;
    public text: string;
    public mask: string;
	public value: string;
    public visible: string;
    public align: string;
    /**水平焦点 0-1**/
    public focusX: number = 0;
    /**垂直焦点 0-1**/
    public focusY: number=0;
    public width: number;
    public height: number;
    /**父容器**/
    public targetPanel: string;
    public touchEnabled: boolean;
    constructor(){
    }
} 