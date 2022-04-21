export type Class<T> = { new(...args: any[]): T; };
export type Constructor<T> = {
    new(...args: any[]): T;
    readonly prototype: T;
}

export type Nullable<T> = T | undefined | null;

/**
 * @author Dorian TERBAH
 * 
 * List that contains only numbers.
 * 
 * @since 1.0
 */
export class NumberList extends Array<number>
{
    constructor()
    {
        super();
    }
}
