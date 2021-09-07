// class ErrorHandler {
//   static process (error, msg) {
//     const errorInfo = {
//       header: 'Unknown type of error',
//       msg: 'No additional info'
//     }
//     if (error.message) {
//       const message = error.message.split(':')
//       errorInfo.header = message[0]
//       errorInfo.message = message[1]
//     } else if (error.status === false) {
//       errorInfo.header = 'Error'
//       errorInfo.message = 'Not enough balance on wallet account'
//     }
//     console.error(errorInfo)
//     return errorInfo
//   }

//   static processWithoutFeedback (error, msg) {
//     console.error(error, msg)
//   }
// }

const checkError = (error) => {
  if (error.message.includes('Internal JSON-RPC error.')) {
    const obj = error.message.match(/[^{]({[^}]*?})/gm, '') || {}
    if (Object.keys(obj).length === 0) {
      return {}
    }
    return JSON.parse(obj)
  }
  return error
}

class ErrorHandler {
  static process (error) {
    const errorObj = checkError(error)
    const errorInfo = {
      header: 'Unknown type of error',
      message: 'No additional info'
    }
    if (errorObj.message.includes('Tx')) {
      errorInfo.header = errorObj.message.split(':')[0]
      errorInfo.message = errorObj.message.split(':')[1].trim()
    } else if (!errorObj.status) {
      errorInfo.header = 'Error'
      errorInfo.message = 'Not enough balance on wallet account'
    }
    return errorInfo
  }

  static processWithoutFeedback (error, msg) {
    console.error(error, msg)
  }
}

export default ErrorHandler

// else if (typeof error === "string") {
//   console.log('lol')
// } else if (error.data?.message) {
//   errorInfo.message = error.data.message.split("]-")[1];
// } else if (error.message) {
//   errorInfo.header = error.message;
// } else if (error.message) {
//   const message = error.message.split(":");
//   errorInfo.header = message[0];
//   errorInfo.message = message[1];
// } else if (!error.status) {
//   errorInfo.header = "Error";
//   errorInfo.message = "Not enough balance on wallet account";
// }
