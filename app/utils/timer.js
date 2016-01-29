import Promise from 'promise'

// todo: test
const delay = function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export default function timeout(promise, time = 2000) {
  return new Promise((resolve, reject) => {
    promise.then((res) => resolve(res))
      .catch((err) => reject(err))
    delay(time).done(() => reject(new Error('Request timed out.')))
  })
}