function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const checkError = (error) => {
  if (error.message.includes('Internal JSON-RPC error.')) {
    const obj = error.message.match(/[^{]({[^}]*?})/gm, '') || {}
    return Object.keys(obj).length === 0 ? {} : JSON.parse(obj)
  }
  return error
}

class ErrorHandler {
  static process (error) {
    const errorObj = checkError(error)

    const errorTemplate = {
      header: 'Unknown type of error',
      details: 'No additional info'
    }

    if (errorObj.code === 3) {
      errorTemplate.header = capitalize(errorObj.message.split(':')[0])
      errorTemplate.details = capitalize(errorObj.message.split(']-')[1])
      return errorTemplate
    } else if (errorObj.stack) {
      errorTemplate.header = capitalize(errorObj.stack.split(':')[1])
      errorTemplate.details = capitalize(errorObj.stack.split(':')[2].trim())
      return errorTemplate
    } else if (!errorObj.status) {
      errorTemplate.header = 'Error'
      errorTemplate.details = 'Not enough balance on wallet account'
      return errorTemplate
    }
    return errorTemplate
  }

  static processWithoutFeedback (error, msg) {
    console.error(error, msg)
  }
}

export default ErrorHandler
