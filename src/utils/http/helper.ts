export function joinTimestamp<T extends boolean>(
  join: boolean | undefined,
  restful: T
): T extends true ? string : object

export function joinTimestamp(join: boolean | undefined, restful = false): string | object {
  if (!join)
    return restful ? '' : {}

  const now = new Date().getTime()
  if (restful)
    return `?_t=${now}`

  return { _t: now }
}
