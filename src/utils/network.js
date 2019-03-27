import {
  Message,
  MessageBox
} from 'element-ui'

window.addEventListener("offline", function (e) {
  Message.error({
    message: '网络链接已断开!'
  });
})

window.addEventListener("online", function (e) {
  Message.success({
    message: '网络链接已链接!'
  });
})
