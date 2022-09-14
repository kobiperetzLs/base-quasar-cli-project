// import axios from 'axios'

let config = null

const getConfig = async () => {
  try {
    if (config) return config
    config = { backend_url: 'http://localhost:4000', }
    return config

  } catch (err) {
    console.log(err)
  }
}

export {
  getConfig,
}
