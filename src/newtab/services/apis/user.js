import host from './_host.js'

const user = {
        register: {
            p: `${host}users`,
            m: 'POST'
        },
        login: {
            p: `${host}login`,
            m: 'POST'
        },
    }

export default user