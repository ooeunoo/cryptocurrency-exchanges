export function ApplyMixins<T>(derivedConstructor: { new (): T }, baseConstructors: { new (): unknown }[]): void {
  baseConstructors.forEach((baseConstructor): void => {
    Object.getOwnPropertyNames(baseConstructor.prototype).forEach((name: string): void => {
      Object.defineProperty(
        derivedConstructor.prototype,
        name,
        /**
         * non-null-assertion is necessary as, presumably, PropertyDescriptor should return a
         * value here.
         *
         * WARNING: this depends on the implementation, so non-null-assertion may not always
         * be a desirable solution for each project
         */
        Object.getOwnPropertyDescriptor(baseConstructor.prototype, name)!,
      );
    });
  });
}
