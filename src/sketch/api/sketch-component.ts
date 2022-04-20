import { v4 as uuidv4 } from 'uuid';

/**
 * @author Dorian TERBAH
 * 
 * This class defines all the methods that must be implemented by
 * the different components.
 * 
 * @since 1.0
 */
export default abstract class SketchComponent<T>
{
    private __uuid: string;

    constructor()
    {
        this.__uuid = uuidv4();
    }
    
    /**
     * @returns The internal id of the component.
     */
    public getID(): string
    {
        return this.__uuid;
    }

    /**
     * Execute the component.
     * @return The computed result of the component.
     */
    abstract execute(): T;

    /**
     * @return A copy of the component.
     */
    abstract copy(): SketchComponent<T>;
}