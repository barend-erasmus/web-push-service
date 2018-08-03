export class ArrayHelper {
    public static distinct<T>(array: Array<T>): Array<T> {
        return array.filter((value: T, index: number, self: Array<T>) => self.indexOf(value) === index);
    }
}