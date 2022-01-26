const errorTemplate = {
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
  return JSON.stringify(error)
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
    : errorTemplate
}

class ErrorHandler {
  static process (error) {
    const errorObj = createErrorObject(error)
    if (errorObj.code === 4001) {
      const infoArray = errorObj.message.split(':')
      errorTemplate.header = capitalize(infoArray[0])
      errorTemplate.details = capitalize(infoArray[1])
      return errorTemplate
    } else if (errorObj.code === 3 || errorObj.code === -32000) {
      return findMessage(errorObj.message)
    } else if (errorObj.stack) {
      errorTemplate.header = capitalize(errorObj.stack.split(':')[1])
      errorTemplate.details = capitalize(errorObj.stack.split(':')[2].trim())
      return errorTemplate
    } else if (errorObj.status) {
      errorTemplate.header = 'Error'
      errorTemplate.details = 'Not enough balance on wallet account'
      return errorTemplate
    } else {
      return errorTemplate
    }
  }

  static processWithoutFeedback (error, msg) {
    console.error(error, msg)
  }
}

export default ErrorHandler
