export default class Utils {
  public static rand(min: number, max: number = null): number {
    if (max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      return Math.floor(Math.random() * (min + 1));
    }
  }

  public static randArray(array: string[]): string
  public static randArray(array: number[]): number
  public static randArray(array: any[]): any {
    return array[this.rand(0, array.length - 1)]
  }
}
