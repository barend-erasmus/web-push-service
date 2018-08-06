export class ArrayHelper {
    public static distinct<T>(array: Array<T>): Array<T> {
        if (!array) {
            throw new Error('Array cannot be null');
        }
    
        return array.filter((value: T, index: number, self: Array<T>) => self.indexOf(value) === index);
    }
}