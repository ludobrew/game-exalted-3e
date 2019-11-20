export function* intersperse<A, B>(iterable: Iterable<A>, separator: B) {
  let first = true
  for (const item of iterable) {
    if (!first) {
      yield separator as B
    }
    first = false
    yield item as A
  }
  return
}
