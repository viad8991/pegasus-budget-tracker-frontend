import {User} from "../api/api";
import {useAuthStore} from "../store/auth";

interface Foo {
    data: User[]
}

class UserService {
    private _serverBaseUrl: string = "http://localhost:8080/api/v1/";

    async all() {
        return fetch(
            this._serverBaseUrl + "user",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": useAuthStore().token
                },
            })
            .then((response) => {
                console.log(useAuthStore().token)
                console.log(response)

                if (response.status === 200) {
                    console.log(JSON.parse(JSON.stringify(response)));

                    return null
                } else {
                    console.log("status is not 200", response)
                    return null;
                }
            })
            .catch(reason => {
                console.log(reason)
                return null
            });
    }

    async find(id: string) {
        return fetch(
            this._serverBaseUrl + "user/" + id,
            {
                method: "GET",
                headers: {"Content-Type": "application/json",},
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json() as User
                } else {
                    console.log("status is not 200", response)
                    return null
                }
            })
            .catch(reason => {
                console.log(reason)
                return null
            })
    }

    async update(id: string | null, value: any) {
        console.log(JSON.stringify({id, value}))
    }

}

export default new UserService();
