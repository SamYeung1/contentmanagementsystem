import { FindOptionsWhere, Like } from 'typeorm';

export class DatabaseFilterUtil {
  static createLikeFilter<T>(
    value: Record<string, any>,
    orOperator: boolean = false,
  ): FindOptionsWhere<T> | FindOptionsWhere<T>[] {
    if (orOperator) {
      const result: FindOptionsWhere<T>[] = [];

      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const singleCondition: any = { [key]: Like(`%${value[key]}%`), };
          result.push(singleCondition);
        }
      }
      return result;
    }
    const andResult: any = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        andResult[key] = Like(`%${value[key]}%`);
      }
    }
    return andResult;
  }
}