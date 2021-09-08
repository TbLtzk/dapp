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

    // console.log(errorObj)

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
