import { useRef } from 'react'

const useApiPoll = (
  apifun: (data: Object) => Promise<any>,
  body: Object = {},
  time = 3000,
  errorCount = 5,
) => {
  const timeErrorCount = useRef(0)
  const apiFun = () => {
    return new Promise((resolve, reject) => {
      let timer = setInterval(() => {
        apifun(body)
          .then((res) => {
            console.log('请求成功', res)
            timeErrorCount.current = 0
            resolve(res)
          })
          .catch((err) => {
            if (timeErrorCount.current > errorCount) {
              clearInterval(timer)
            } else {
              timeErrorCount.current++
            }
            console.log('err', timeErrorCount.current)
            reject(err)
          })
      }, time)
    })
  }

  return [apiFun]
}

export default useApiPoll
