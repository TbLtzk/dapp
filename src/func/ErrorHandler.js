import { isEmpty } from 'lodash'

const DEFAULT_ERROR = {
  header: 'Unknown type of error',
  details: 'No additional info'
}

function capitalize (string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function createErrorObject (error) {
  if (error?.message?.includes('Internal JSON-RPC error.')) {
    const obj = error.message.match(/[^{]({[^}]*?})/gm, '') || {}
    return JSON.parse(obj)
  }
  return JSON.parse(JSON.stringify(error))
}

function findMessage (message) {
  const regexp = /(: ERC20:|:|]-|\[.+]-|\.)/gim

  const array = message
    .split(regexp)
    .map((str) => str.trim())
    .filter((str) => !regexp.test(str) && str.length)

  return array.length
    ? {
        header: capitalize(array[0]),
        details: capitalize(array[1])
      }
    : DEFAULT_ERROR
}

class ErrorHandler {
  static process (error) {
    const errorObj = createErrorObject(error)
    if (isEmpty(errorObj)) {
      return DEFAULT_ERROR
    } else if (errorObj.code === 4001) {
      const infoArray = errorObj.message.split(':')
      return { header: capitalize(infoArray[0]), details: capitalize(infoArray[1]) }
    } else if (errorObj.code === 3 || errorObj.code === -32000) {
      return findMessage(errorObj.message)
    } else if (errorObj.stack) {
      return {
        header: capitalize(errorObj.stack.split(':')[1]),
        details: capitalize(errorObj.stack.split(':')[2].trim())
      }
    } else {
      return DEFAULT_ERROR
    }
  }

  static processWithoutFeedback (error, msg) {
    console.error(error, msg)
  }
}

export default ErrorHandler
