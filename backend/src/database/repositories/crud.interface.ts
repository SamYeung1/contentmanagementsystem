export default interface CrudInterface<T> {
    create: (data: T) => Promise<T>;
    update: (data: T) => Promise<T>;
    delete: (id: T) => Promise<boolean>;
}