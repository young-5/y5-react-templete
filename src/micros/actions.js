class Actions {
  actions = {
    onGlobalStateChange: () => {},
    setGlobalState: () => {},
  }
  setActions(actions) {
    this.actions = actions
  }
  onGlobalStateChange(...arges) {
    return this.actions.onGlobalStateChange(...arges)
  }
  setGlobalState(...arges) {
    return this.actions.setGlobalState(...arges)
  }
}

const actions = new Actions()

export default actions
