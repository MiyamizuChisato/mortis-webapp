import type { Instant } from '#server/service/instant.service.ts'
import mitt from 'mitt'
// 创建事件总线实例
const emitter = mitt<{
  ServiceError: any
  SaveInstant: Instant
}>()
export default emitter
