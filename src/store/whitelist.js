import {CHOOSE_HOST} from './white_list_mutations'

const HOST = {
  dev: 'https://erp-dev.xuprise.com',
  qa: 'https://erp-qa.xuprise.com',
  pl: 'https://erp-pl.xuprise.com',
  online: 'https://erp.xuprise.com'
}

const whitelist = {
  state: {
    cuHost: HOST.dev
  },
  mutations: {
    [CHOOSE_HOST]: (state, profile) => {
      state.cuHost = HOST[profile]
    }
  }
}

export default whitelist
