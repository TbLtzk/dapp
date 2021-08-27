class ErrorHandler {
  static process (error, msg) {
    if (error.message) {
      const message = error.message.split(':')
      console.error({ title: message[0], info: message[1] })
    } else if (error.status === false) {
      console.error({ title: 'Error', info: 'Not enough balance on wallet account' })
    } else {
      console.error({ title: 'Unknown type of error', info: 'No additional info' })
    }
  }

  static processWithoutFeedback (error, msg) {
    console.error(error, msg)
  }
}

export default ErrorHandler
