import host from './_host.js'

const user = {
        profile: {
            p: `${host}users/profile`,
            m: 'GET'
        },
        register: {
            p: `${host}users`,
            m: 'POST'
        },
        login: {
            p: `${host}login`,
            m: 'POST'
        },
        logout: {
            p: `${host}logout`,
            m: 'POST'
        }
    }

export default user