class ErrorHandler {
  static process (error, msg) {
    const errorInfo = {
      header: 'Unknown type of error',
      msg: 'No additional info'
    }
    if (error.message) {
      const message = error.message.split(':')
      errorInfo.header = message[0]
      errorInfo.message = message[1]
    } else if (error.status === false) {
      errorInfo.header = 'Error'
      errorInfo.message = 'Not enough balance on wallet account'
    }
    console.error(errorInfo)
    return errorInfo
  }

  static processWithoutFeedback (error, msg) {
    console.error(error, msg)
  }
}

export default ErrorHandler
