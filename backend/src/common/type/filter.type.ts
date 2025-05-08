export class Filter<T>{
    like:Record<keyof T, string>
}