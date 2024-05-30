import 'dotenv/config'

import app from './server'

import axios from 'axios'

const PORT = process.env.PORT || 8080

// interface DataInterfaceError {
//     error : string
// }

// interface DataInterfaceSuccess {
//     token : string;
//     server: {
//         id: string;
//         name: string;
//     }
// }

// interface DataInterface {
//     data: DataInterfaceError | DataInterfaceSuccess
// }

let auth_server_token;

app.listen(PORT, () => {
    console.log('[FILE SERVER SERVICE]')
    console.log('[SERVER] listening on port ' + PORT);

    axios.post(process.env.AUTH_SERVER_ADDRESS as string + '/api/servers/login', {
        name: process.env.AUTH_SERVER_USERNAME as string,
        password: process.env.AUTH_SERVER_PASSWORD as string
    })
        .then(data => {
            // not registered
            if (data.data.error) {
                axios.post(process.env.AUTH_SERVER_ADDRESS as string + '/api/servers/register', {
                    name: process.env.AUTH_SERVER_USERNAME as string,
                    password: process.env.AUTH_SERVER_PASSWORD as string
                })
                    .then(data => {
                        auth_server_token = data.data.token
                        return
                    })
            }
            auth_server_token = data.data.token
            return
        })

})