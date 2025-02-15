import { Limit, LimitType } from './Limit'
import { arrayLast } from './utils'

export type ScrollContainOptionType = false | 'trimSnaps' | 'keepSnaps'

export type ScrollContainType = {
  snapsContained: number[]
  scrollContainLimit: LimitType
}

export function ScrollContain(
  viewSize: number,
  contentSize: number,
  snapsAligned: number[],
  containScroll: ScrollContainOptionType
): ScrollContainType {
  const scrollBounds = Limit(-contentSize + viewSize, 0)
  const snapsBounded = measureBounded()
  const scrollContainLimit = findScrollContainLimit()
  const snapsContained = measureContained()

  function findScrollContainLimit(): LimitType {
    const startSnap = snapsBounded[0]
    const endSnap = arrayLast(snapsBounded)
    const min = snapsBounded.lastIndexOf(startSnap)
    const max = snapsBounded.indexOf(endSnap) + 1
    return Limit(min, max)
  }

  function measureBounded(): number[] {
    return snapsAligned
      .map(scrollBounds.constrain)
      .map((scrollBound) => parseFloat(scrollBound.toFixed(3)))
  }

  function measureContained(): number[] {
    if (contentSize <= viewSize) return [scrollBounds.max]
    if (containScroll === 'keepSnaps') return snapsBounded
    const { min, max } = scrollContainLimit
    return snapsBounded.slice(min, max)
  }

  const self: ScrollContainType = {
    snapsContained,
    scrollContainLimit
  }
  return self
}
