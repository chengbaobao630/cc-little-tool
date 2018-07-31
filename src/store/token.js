const NO_LOGIN = 0
const UN_KNOWN = -1
const LOGIN = 1

const token = {
  state: {
    loginState: UN_KNOWN
  },
  mutations: {
    KICK_OUT: state => {
      state.loginState = NO_LOGIN
    },
    LOGIN: state => {
      state.loginState = LOGIN
    }
  }
}

export default token
