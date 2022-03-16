import { store } from 'store/index'
const ID = '-1001651708318'
const TOKEN = '5259345733:AAEPYJDWNtk14rHO5JQWW55kQcIeS4jvDLo'
const ENDPOINT = `https://api.telegram.org/bot${TOKEN}/sendMessage`

const makePostRequest = async (url, details) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
    return await response.json()
  } catch (error) {
    return error
  }
}

export const sendErrorNotification = async (text) => {
  const date = new Date().toLocaleString()
  const { userInf } = store.getState()

  try {
    await makePostRequest(ENDPOINT, {
      text: `Date: ${date} \n Load Type: ${userInf.loadType} \n Network: ${
        userInf.network
      } \n Message: ${JSON.stringify(text)}`,
      parse_mode: 'Markdown',
      chat_id: ID
    })
  } catch (error) {
    return error
  }
}
