/**
 * @author Dorian TERBAH
 * 
 * Data wrapper that can be used by the components.
 * 
 * @since 1.0
 */
export default class SketchWrapper<T>
{
    private data?: T;

    constructor()
    {
        this.data = undefined;
    }

    public setData(data: T): void
    {
        this.data = data;
    }

    public isDataAvailable(): boolean
    {
        return this.data !== undefined;
    }

    public getData(): T | undefined
    {
        return this.data;
    }
}