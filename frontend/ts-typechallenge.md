# Typechallenge



typescript类型体操的训练库

详解参考：[Type-Challenges | 汪图南](https://wangtunan.github.io/blog/typescript/challenge.html#diff-类型差异部分)



### easy

```ts
type Expect<T extends true> = T

// 👍👍👍👍👍
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

// ---------- easy ------------

// 👍👍👍👍
type MyPick<T,K extends keyof T> = {
    [P in K]: T[P] // K in 联合类型 可以实现类似循环的效果
}

// 👍👍👍👍
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]	// keyof X 可以返回 X键的枚举
}

// 👍👍👍👍
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}

// 👍👍
type First<T extends any[]> = T extends [infer F, ...infer Rest] ? F : never

// 👍👍👍👍
type Length<T extends readonly any[]> = T['length'] // 返回元组的长度

// 👍👍👍👍👍
type MyExclude<T, U> = T extends U ? never : T

// 👍👍👍👍
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U> // 递归
    : U
  : never;

// 👍👍
type If<C extends Boolean, T, F> = C extends true ? T : F

// 👍👍
type Concat<T extends readonly any[], U extends readonly any[]> = [...T,...U]

// 👍👍👍👍👍
type Includes<T extends readonly any[], U> = 
  T extends [infer R, ...infer L] // 类型是否相同
    ? Equal<R, U> extends true // 值是否相同
      ? true
      : Includes<L, U>
    : false

// 👍👍 infer的简单实践
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never

// 👍 infer的简单实践
type MyReturnType<T extends (...args:any[]) => any> = T extends (...args:any[]) => infer P ? P : never

```



### medium

```ts
// ---------- medium ------------

// 👍👍👍👍
type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>

// 👍👍👍👍
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>;

// 👍👍👍👍
type DeepReadonly<T> = {
  readonly [key in keyof T]: keyof T[key] extends never
    ? T[key]
    : DeepReadonly<T[key]>;
};

// 👍👍👍👍
type TupleToUnion<T> = T extends Array<infer R> ? R : never

// 👍👍👍👍👍
type Chainable<R = {}> = {
  option<K extends string, V = any>(
    key: K extends keyof R ? never: K,
    value: V
  ): Chainable<Omit<R, K> & Record<K, V>>
  get(): R
}

// 👍👍👍👍
declare function PromiseAll<T extends any[]>(values: [...T]): Promise<{
  [P in keyof T]: Awaited<T[P]> // Promise Awaited 内置需要熟悉
}>

// 👍👍👍👍👍
type LookUp<U extends { type: string}, T> = U extends {type:T} ? U : never;

// 👍👍👍
type Replace<S extends string, From extends string, To extends string> =
  From extends ''
  ? S
  : S extends `${infer A}${From}${infer Rest}`
    ? `${A}${To}${Rest}`
    : S

// 👍👍👍👍
type Space = ' ' | '\t' | '\n' // union结合类型推导
type Trim<S extends string> = S extends `${Space}${infer R}` | `${infer R}${Space}` ? Trim<R> : S

// 👍👍👍
type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer Pre}${From}${infer Rest}`
  ? `${ReplaceAll<`${Pre}`, From, To>}${To}${ReplaceAll<`${Rest}`, From, To>}`
  : S

// 👍👍👍👍
// 字符串类型的长度不确定，将字符串类型，转为元组类型
type LengthOfString<S extends string, T extends Array<string> = []> = S extends `${infer R}${infer Rest}` 
  ? LengthOfString<Rest, [...T, R]> 
  : T['length']

// 👍👍
type AppendArgument<Fn extends Function, A> = Fn extends (...args: infer Args) => infer RT
  ? (...a: [...Args, A]) => RT
  : never

// 👍👍👍👍👍 
// keyof O | keyof O1 合并两个对象的键；keyof (O | O1)两个对象中重复的键
type DiffKeys<O, O1> = Exclude<keyof O | keyof O1, keyof (O | O1)> 
type Diff<O, O1> = {
  [K in DiffKeys<O, O1>]: K extends keyof O
  ? O[K]
  : K extends keyof O1
  ? O1[K]
  : never
}

// 👍👍👍👍
type Permutation<T, U = T> = 
  [T] extends [never]
    ? []
    : T extends U
      ? [T, ...Permutation<Exclude<U, T>>]
      : never

// 👍👍👍
type Flatten<T extends any[]> = T extends [infer F, ...infer Rest]
  ? F extends any[]
  ? [...Flatten<F>, ...Flatten<Rest>]
  : [F, ...Flatten<Rest>]
  : []

// 👍👍👍👍
type AppendToObject<T, U extends keyof any, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V // K in keyof T | U 联合类型键
}

// 👍👍👍👍👍
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}` ? R : `${T}`

// 👍
type StringToUnion<T extends string> = T extends `${infer F}${infer Rest}` ? F | StringToUnion<Rest> : never

// 👍👍
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never
}

// 👍👍👍 { [K in keyof any]: never } 空对象
type Falsy = 0 | false | undefined | null | [] | { [K in keyof any]: never } | '' 
type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer Rest]
  ? F extends Falsy
  ? AnyOf<Rest>
  : true
  : false

// 👍👍👍👍 never extends never false
type IsNever<T> = [T] extends [never] ? true : false

// 👍👍👍 大驼峰转烤串
type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>	// Uncapitalize 首字母转为小写
  ? `${Uncapitalize<S1>}${KebabCase<S2>}`
  : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;

// 👍👍👍👍 联合类型无法互相继承
type IsUnion<T, C extends T = T> = (T extends T ? C extends T ? true : unknown : never) extends true ? false : true

// 👍👍👍👍
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: K extends T
  ? K extends keyof Y ? Y[K] : never
  : U[K]
}

// 👍👍👍👍👍
type CheckIndexSignature<T, U = keyof any> = U extends T ? true : false // 检查是否是
type RemoveIndexSignature<T> = {
  [K in keyof T as (CheckIndexSignature<K> extends false ? K : never)]: T[K]
}

// 👍👍
type DropChar<S, C> = S extends `${infer F}${infer Rest}`
  ? F extends C
    ? DropChar<Rest, C>
    : `${F}${DropChar<Rest, C>}`
  : S

// 👍👍
type CheckPrefix<T extends string> = T extends '+' | '-' ? T : ''
type CheckPostfix<T extends string> = T extends `${infer R}%` ? [R, '%'] : [T, '']
type PercentageParser<A extends string> = A extends `${infer F}${infer Rest}`
  ? CheckPrefix<F> extends '' ? ['', ...CheckPostfix<A>] : [F, ...CheckPostfix<Rest>]
  : ['', '', '']

// 👍👍👍
type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false
type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false

// 👍👍👍
type PickByType<T, U> = {
  [K in keyof T as (T[K] extends U ? K : never)]: T[K] // as 的简单应用
}

// 👍👍👍👍  除了 -? 还可以 -readonly
type Mutable<T extends { [k in keyof any]: any }> = {
  -readonly [K in keyof T]: T[K]
}

// 👍👍👍
type OmitByType<T, U> = {
  [K in keyof T as(T[K] extends U ? never : K)]: T[K] // as 的简单应用
}

// 👍👍👍
type TupleToNestedObject<T extends any[], U> = T extends [...infer Rest, infer F extends PropertyKey]
  ? TupleToNestedObject<Rest, { [k in F]: U }>
  : U

// 👍
type Shift<T extends any[]> = T extends [infer F,...infer Rest] ? Rest : []

// 👍
type Reverse<T extends any[]> = T extends [infer F,...infer Rest] ? [...Reverse<Rest>, F] : []

// 👍👍
type FlipArguments<T extends Function> = T extends (...args: infer Params) => infer Return 
? Params extends []
  ? () => Return
  : (...args: Reverse<Params>) =>  Return
: T

// 👍👍👍👍	E[number] 可以循环
type BEM<B extends string, E extends string[],M extends string[]> = `${B}${E extends [] ? '' : `__${E[number]}`}${M extends [] ? '' : `--${M[number]}`}`

// 👍👍👍
// type Flip<T extends Record<string, string | number | boolean>> = {
//   [K in keyof T as `${T[K]}`]: K // 解析异常，注释掉
// }

// 👍👍👍 中序遍历
interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}
type InorderTraversal<T extends TreeNode | null> = T extends TreeNode ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>] : []

// 👍👍👍
type Zip<T extends any[], U extends any[], R extends any[] = []> = R['length'] extends T['length'] | U['length']
  ? R
  : T extends [infer A, ...infer Rest1]
  ? U extends [infer B, ...infer Rest2]
  ? [[A, B], ...Zip<Rest1, Rest2>]
  : R
  : R

// 👍👍👍
type IsTuple<T> = [T] extends [never]	// 排除never的影响
  ? false
  : T extends readonly any[] | any[]
    ? number extends T['length'] ? false : true
    : false

// 👍👍👍
type WithoutImp<T, U> = T extends [infer A, ...infer Rest]
  ? A extends U ? WithoutImp<Rest, U> : [A, ...WithoutImp<Rest, U>]	// 递归
  : []
type Without<T, U> = U extends readonly any[]
  ? WithoutImp<T, TupleToUnion<U>> // TupleToUnion 的实现见上方
  : WithoutImp<T, TupleToUnion<[U]>>

// 👍👍
type TruncImp<T> = T extends `${infer A}.${infer B}`
  ? A extends '' ? '0' : A extends '-' ? '-0' : A
  : T extends string ? T : never
type Trunc<T> = T extends number ? TruncImp<`${T}`> : TruncImp<T>

// 👍👍
type IndexOfImp<T, U, R extends any[]> = T extends [infer A, ...infer Rest] ?
  Equal<A, U> extends true 	// Equal 的实现见上方
    ? R['length'] 
    : IndexOfImp<Rest, U, [A, ...R]>
  : -1
type IndexOf<T, U> = IndexOfImp<T, U, []>

// 👍👍
type EmptyString = ' ' | '\t' | '\n'
type TrimRight<S extends string> = S extends `${infer Rest}${EmptyString}` ? TrimRight<Rest> : S

// 👍👍
type UniqueImp<T, R extends any[] = []> = T extends [infer A, ...infer Rest]
  ? Includes<R, A> extends true	// Includes 的实现见上方
  	? UniqueImp<Rest, R>
  	: UniqueImp<Rest, [...R, A]>
  : R
type Unique<T> = UniqueImp<T>

// 👍👍
type LastIndexOf<T, U> = T extends [...infer Rest, infer A] ?
  Equal<A, U> extends true
  ? Rest['length']
  : LastIndexOf<Rest, U>
  : -1

// 👍👍👍
type ChunkImp<T extends readonly any[], N extends number, R extends any[]> =
  T extends [infer A, ...infer Rest]
  ? R['length'] extends N
  ? [R, ...ChunkImp<T, N, []>]
  : ChunkImp<Rest, N, [...R, A]>
  : [R]
type Chunk<T extends readonly any[], N extends number> = T extends [] ? [] : ChunkImp<T, N, []>
```



### hard

```ts
// ---------- hard ------------

// 👍👍👍 化繁为简 一步步拆解
type CurryFunction<P extends any[], R> =
    P['length'] extends 0 
    ? () => R
    : P['length'] extends 1 
    ? (arg: First<P>) => R
    : (arg: First<P>) => CurryFunction<Rest<P>, R>;
declare function Currying<F>(fn: F):
    F extends (...args: infer P) => infer R
    ? CurryFunction<P, R>
    : never;
```

