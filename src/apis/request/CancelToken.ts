import axios from 'axios'
class CancelToken {
  public pendingPool = new Map()

  public setHash(config: any) {
    let urlHash = [config.method, config.url].join('$$')
    return urlHash
  }
  public addPendingPool(config: any, hashUrl: string) {
    const urlHash = hashUrl || this.setHash(config)
    config.cancelToken = new axios.CancelToken((cancel) => {
      if (!this.pendingPool.has(urlHash)) {
        this.pendingPool.set(urlHash, cancel)
      }
    })
    return urlHash
  }
  public removePendingPool(config: any, hashUrl: string) {
    const urlHash = hashUrl || this.setHash(config)
    if (this.pendingPool.has(urlHash)) {
      const cancel = this.pendingPool.get(urlHash)
      cancel && cancel(urlHash)
      this.pendingPool.delete(urlHash)
    }
  }

  public clearPendingPool() {
    // for (const [url, cancel] of this?.pendingPool?.entries()) {
    //   cancel(url);
    // }
    this.pendingPool.clear()
  }
}

export default CancelToken
