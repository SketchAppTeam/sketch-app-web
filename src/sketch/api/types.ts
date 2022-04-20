export type Class<T> = { new(...args: any[]): any; };
export type Constructor<T> = {
    new(...args: any[]): T;
    readonly prototype: T;
}

export type Nullable<T> = T | undefined | null;
