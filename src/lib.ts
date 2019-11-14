export function* intersperse(iterable: Iterable<any>, separator: any) {
  let first = true
  for (const item of iterable) {
    if (!first) {
      yield separator
    }
    first = false
    yield item
  }
  return
}
