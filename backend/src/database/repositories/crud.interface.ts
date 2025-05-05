export default interface CrudInterface<I> {
    create: (input: I) => Promise<I>;
    update: (id:number,input: Omit<I,keyof I>) => Promise<I>;
    delete: (id: number) => Promise<boolean>;
}