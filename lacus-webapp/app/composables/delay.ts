import { isClient } from '@vueuse/core'

export async function delayFn<T>(callback: () => T, delay: number) {
  const [result] = await Promise.all([
    await callback(),
    new Promise(resolve => setTimeout(resolve, delay)),
  ])
  return result
}
export async function clientDelayFn<T>(callback: () => T, delay?: number) {
  let timeout = 0
  if (isClient) {
    timeout = delay || 0
  }
  const [result] = await Promise.all([
    await callback(),
    new Promise(resolve => setTimeout(resolve, timeout)),
  ])
  return result
}
