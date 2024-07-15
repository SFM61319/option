/**
 * An `Option` type that represents a value that may or may not be present.
 *
 * The `Option` type provides a set of methods for working with optional values,
 * including checking if a value is present, mapping over the value, and
 * handling the case where the value is absent.
 *
 * This implementation of `Option` is generic, allowing it to hold values of any
 * type `T`.
 *
 * @template T The type of the value that this `Option` may contain.
 */
export default class Option<T> {
  /**
   * The value that this `Option` may contain,
   * or `undefined` if the `Option` represents a missing value.
   */
  public value: T | undefined;

  /**
   * Constructs a new `Option` instance with the provided value,
   * or an `Option` representing a missing value if no value is provided.
   *
   * @param [value=undefined] The value to be contained in the `Option`,
   * or `undefined` to create an `Option` representing a missing value.
   */
  public constructor(value: T | undefined = undefined) {
    this.value = value;
  }

  /**
   * Creates a new `Option` instance containing the provided value.
   *
   * @template T The type of the value to be contained in the `Option`.
   * @param value The value to be contained in the `Option`.
   * @returns A new `Option` instance containing the provided value.
   */
  public static some<T>(value: T): Option<T> {
    return new Option(value);
  }

  /**
   * Creates a new `Option` instance representing a missing value.
   *
   * @template T The type of the value that this `Option` may contain.
   * @returns A new `Option` instance with an undefined value.
   */
  public static none<T>(): Option<T> {
    return new Option();
  }

  /**
   * Exchanges the value contained in this `Option` instance with the provided value,
   * and returns a new `Option` instance containing the previous value.
   *
   * @param value The new value to be stored in this `Option` instance.
   * @returns A new `Option` instance containing the previous value.
   */
  private _exchange(value: T | undefined): Option<T> {
    const optb = new Option(this.value);
    this.value = value;

    return optb;
  }

  /**
   * Checks if this `Option` contains a value.
   *
   * @returns `true` if this `Option` contains a value, `false` otherwise.
   */
  public isSome(): this is { value: T } {
    return !this.isNone();
  }

  /**
   * Checks if this `Option` contains a value that satisfies the provided predicate.
   *
   * @param predicate The predicate function to check the contained value against.
   * @returns `true` if this `Option` contains a value and
   * the predicate returns `true` for that value, `false` otherwise.
   */
  public isSomeAnd(predicate: (value: T) => boolean): boolean {
    return this.isSome() && predicate(this.value);
  }

  /**
   * Checks if this `Option` does not contain a value.
   *
   * @returns `true` if this `Option` does not contain a value, `false` otherwise.
   */
  public isNone(): this is { value: undefined } {
    return this.value === undefined;
  }

  /**
   * Returns the value contained in the `Option` as a single-element array,
   * or an empty array if the `Option` is `None`.
   *
   * @returns The value contained in the `Option` as a single-element array,
   * or an empty array if the `Option` is `None`.
   */
  public asSlice(): T[] {
    return this.isSome() ? [this.value] : [];
  }

  /**
   * Returns the value contained in the `Option` instance,
   * or throws an error with the provided message if the `Option` is `None`.
   *
   * @param msg The error message to use if the `Option` is `None`.
   * @returns The value contained in the `Option` instance.
   * @throws {Error} If the `Option` is `None`,
   * an error is thrown with the provided message.
   */
  public expect(msg: string): T {
    if (this.isSome()) {
      return this.value;
    }

    throw new Error(msg);
  }

  /**
   * Returns the value contained in the `Option` instance,
   * or throws an error with the message `"Option is None"` if the `Option` is `None`.
   *
   * @returns The value contained in the `Option` instance.
   * @throws {Error} If the `Option` is `None`,
   * an error is thrown with the message `"Option is None"`.
   */
  public unwrap(): T {
    return this.expect("Option is None");
  }

  /**
   * Returns the value contained in the `Option` instance,
   * or the provided fallback value if the `Option` is `None`.
   *
   * @param fallback The value to return if the `Option` is `None`.
   * @returns The value contained in the `Option` instance,
   * or the provided fallback value if the `Option` is `None`.
   */
  public unwrapOr(fallback: T): T {
    return this.unwrapOrElse(() => fallback);
  }

  /**
   * Returns the value contained in the `Option` instance,
   * or the result of calling the provided fallback function if the `Option` is `None`.
   *
   * @param f The fallback function to call if the `Option` is `None`.
   * @returns The value contained in the `Option` instance,
   * or the result of calling the provided fallback function if the `Option` is `None`.
   */
  public unwrapOrElse(f: () => T): T {
    return this.isSome() ? this.value : f();
  }

  /**
   * Maps the value contained in the `Option` instance using the provided function `f`.
   *
   * If the `Option` is `None`, a new `Option` instance with no value is returned.
   *
   * @template U The type of the value that the resulting `Option` will contain.
   * @param f The function to apply to the value contained in the `Option` instance.
   * @returns A new `Option` instance containing the result of applying `f` to the value.
   */
  public map<U>(f: (value: T) => U): Option<U> {
    return this.isSome() ? Option.some(f(this.value)) : Option.none();
  }

  /**
   * Inspects the value contained in the `Option` instance by applying the provided function `f`.
   *
   * If the `Option` is `Some`, the function `f` is called with the contained value.
   * The `Option` instance is then returned, allowing for method chaining.
   *
   * @param f The function to apply to the value contained in the `Option` instance.
   * @returns The original `Option` instance, allowing for method chaining.
   */
  public inspect(f: (value: T) => void): Option<T> {
    if (this.isSome()) {
      f(this.value);
    }

    return this;
  }

  /**
   * Maps the value contained in the `Option` instance using the provided function `f`,
   * or returns the provided fallback value if the `Option` is `None`.
   *
   * @template U The type of the value that the resulting `Option` will contain.
   * @param fallback The fallback value to return if the `Option` is `None`.
   * @param f The function to apply to the value contained in the `Option` instance.
   * @returns The result of applying `f` to the value contained in the `Option` instance,
   * or the provided fallback value if the `Option` is `None`.
   */
  public mapOr<U>(fallback: U, f: (value: T) => U): U {
    return this.mapOrElse(() => fallback, f);
  }

  /**
   * Maps the value contained in the `Option` instance using the provided function `f`,
   * or returns the result of calling the provided fallback function if the `Option` is `None`.
   *
   * @template U The type of the value that the resulting `Option` will contain.
   * @param fallback The fallback function to call if the `Option` is `None`.
   * @param f The function to apply to the value contained in the `Option` instance.
   * @returns The result of applying `f` to the value contained in the `Option` instance,
   * or the result of calling the provided fallback function if the `Option` is `None`.
   */
  public mapOrElse<U>(fallback: () => U, f: (value: T) => U): U {
    return this.isSome() ? f(this.value) : fallback();
  }

  /**
   * Combines the current `Option` instance with the provided `Option` instance `optb` using the `and` operation.
   *
   * If the current `Option` instance is `Some`, the provided `Option` instance `optb` is returned.
   * Otherwise, a new `Option` instance with no value is returned.
   *
   * @template U The type of the value that the resulting `Option` will contain.
   * @param optb The `Option` instance to combine with the current `Option` instance.
   * @returns The resulting `Option` instance after applying the `and` operation.
   */
  public and<U>(optb: Option<U>): Option<U> {
    return this.andThen(() => optb);
  }

  /**
   * Maps the value contained in the `Option` instance using the provided function `f`,
   * or returns a new `Option` instance with no value if the current `Option` is `None`.
   *
   * @template U The type of the value that the resulting `Option` will contain.
   * @param f The function to apply to the value contained in the `Option` instance.
   * @returns A new `Option` instance containing the result of applying `f` to the value
   * contained in the current `Option` instance, or a new `Option` instance with no value
   * if the current `Option` is `None`.
   */
  public andThen<U>(f: (value: T) => Option<U>): Option<U> {
    return this.isSome() ? f(this.value) : Option.none();
  }

  /**
   * Filters the value contained in the `Option` instance using the provided predicate function.
   *
   * If the `Option` instance is `Some` and the predicate function returns `true` for the contained value,
   * the `Option` instance is returned. Otherwise, a new `Option` instance with no value is returned.
   *
   * @param predicate The function to use to filter the value contained in the `Option` instance.
   * @returns A new `Option` instance containing the value if the predicate function returns `true`,
   * or a new `Option` instance with no value if the predicate function returns `false` or the `Option` is `None`.
   */
  public filter(predicate: (value: T) => boolean): Option<T> {
    return this.isSomeAnd(predicate) ? this : Option.none();
  }

  /**
   * Combines the current `Option` instance with the provided `Option` instance `optb` using the `or` operation.
   *
   * If the current `Option` instance is `Some`, it is returned.
   * Otherwise, the provided `Option` instance `optb` is returned.
   *
   * @param optb The `Option` instance to combine with the current `Option` instance.
   * @returns The resulting `Option` instance after applying the `or` operation.
   */
  public or(optb: Option<T>): Option<T> {
    return this.orElse(() => optb);
  }

  /**
   * Combines the current `Option` instance with the provided function `f` using the `or` operation.
   *
   * If the current `Option` instance is `Some`, it is returned.
   * Otherwise, the result of calling `f()` is returned.
   *
   * @param f The function to call to get the `Option` instance to return if the current `Option` instance is `None`.
   * @returns The resulting `Option` instance after applying the `or` operation.
   */
  public orElse(f: () => Option<T>): Option<T> {
    return this.isSome() ? this : f();
  }

  /**
   * Combines the current `Option` instance with the provided
   * `Option` instance `optb` using the `xor` operation.
   *
   * If the current `Option` instance is `Some` and the provided `Option`
   * instance `optb` is `None`, the current `Option` instance is returned.
   * If the current `Option` instance is `None` and the provided `Option
   * instance `optb` is `Some`, the provided `Option` instance `optb` is returned.
   * Otherwise, a new `Option` instance with no value is returned.
   *
   * @param optb The `Option` instance to combine with the current `Option` instance.
   * @returns The resulting `Option` instance after applying the `xor` operation.
   */
  public xor(optb: Option<T>): Option<T> {
    return this.isSome() ? (optb.isNone() ? this : Option.none()) : optb;
  }

  /**
   * Inserts the provided value into the `Option` instance.
   *
   * @param value The value to insert into the `Option` instance.
   * @returns The inserted value.
   */
  public insert(value: T): T {
    this.value = value;
    return this.value;
  }

  /**
   * Retrieves the value of the `Option` instance,
   * or inserts the provided value if the `Option` instance is `None`.
   *
   * @param value The value to insert if the `Option` instance is `None`.
   * @returns The value of the `Option` instance,
   * or the provided value if the `Option` instance is `None`.
   */
  public getOrInsert(value: T): T {
    return this.getOrInsertWith(() => value);
  }

  /**
   * Retrieves the value of the `Option` instance, or inserts the value
   * returned by the provided function `f` if the `Option` instance is `None`.
   *
   * @param f The function to call to get the value to insert if the `Option` instance is `None`.
   * @returns The value of the `Option` instance,
   * or the value returned by `f` if the `Option` instance is `None`.
   */
  public getOrInsertWith(f: () => T): T {
    return this.isSome() ? this.value : this.insert(f());
  }

  /**
   * Removes the value from the current `Option` instance and
   * returns a new `Option` instance containing the previous value.
   *
   * @returns A new `Option` instance containing
   * the previous value of the current `Option` instance.
   */
  public take(): Option<T> {
    return this._exchange(undefined);
  }

  /**
   * Replaces the value of the current `Option` instance with the provided value
   * and returns a new `Option` instance containing the previous value.
   *
   * @param value The new value to set for the `Option` instance.
   * @returns A new `Option` instance containing
   * the previous value of the current `Option` instance.
   */
  public replace(value: T): Option<T> {
    return this._exchange(value);
  }

  /**
   * Combines the values of two `Option` instances into a new `Option` instance
   * containing a tuple of the two values, if both `Option` instances are `Some`.
   *
   * @template U The type contained in the other `Option` instance.
   * @param other The other `Option` instance to zip with the current instance.
   * @returns A new `Option` instance containing a tuple of the values
   * of the current and the other `Option` instance, if both are `Some`.
   * Otherwise, returns a `None` `Option` instance.
   */
  public zip<U>(other: Option<U>): Option<[T, U]> {
    return this.isSome() && other.isSome()
      ? Option.some([this.value, other.value])
      : Option.none();
  }
}
