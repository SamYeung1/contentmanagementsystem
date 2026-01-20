import { Like } from 'typeorm';

export class DatabaseFilterUtil {
  static createLikeFilter<T>(value: Record<keyof T, any>,orOperator:boolean = false): Record<keyof T, any> | Record<keyof T, any>[] {
    if(orOperator){
      const result:Record<keyof T, any>[] = [];
      for (const key in value) {
        value[key] = Like(`%${value[key]}%`);
        result.push(value);
      }
      return result;
    }
    for (const key in value) {
      value[key] = Like(`%${value[key]}%`);
    }
    return value;
  }
}