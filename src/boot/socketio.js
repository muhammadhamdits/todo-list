import { boot } from 'quasar/wrappers'
import socketIO from 'socket.io-client'

export const SocketInstance = socketIO('http://localhost:3000')
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  
})
