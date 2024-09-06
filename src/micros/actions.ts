class Actions {
  actions = {
    onGlobalStateChange: () => {},
    setGlobalState: () => {},
  }
  setActions(actions) {
    this.actions = actions
  }
  onGlobalStateChange(...arges) {
    // @ts-ignore
    return this.actions.onGlobalStateChange(...arges)
  }
  setGlobalState(...arges) {
    // @ts-ignore
    return this.actions.setGlobalState(...arges)
  }
}

const actions = new Actions()

export default actions
