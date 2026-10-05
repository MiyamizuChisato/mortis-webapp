export function success(message = 'SUCCESS') {
  return {
    error: false,
    message,
  }
}
export function ok<T>(payload: T, message = 'SUCCESS') {
  return {
    error: false,
    message,
    payload,
  }
}
export function ng<T>(message = 'UNKNOWN_ERROR', payload?: T) {
  return {
    error: true,
    message,
    payload,
  }
}
