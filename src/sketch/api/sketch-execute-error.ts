/**
 * @author Dorian TERBAH
 * 
 * Exception used when there is an error during
 * the execution of a component.
 * 
 * @since 1.0
 */
export default class SketchExecutionException extends Error
{
    constructor(message: string)
    {
        super(message);
    }
}