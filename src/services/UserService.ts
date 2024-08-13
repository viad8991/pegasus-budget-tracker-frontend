import {User} from "../store/user/userTypes";
import axios from "../utils/axios";

class UserService {
    private _stubUsers: User[] = [
        {
            id: "user-stub-1",
            username: "Foo Foo",
            email: "foo@foo.com",
            isAdmin: false,
            hasFamily: true,
            verified: true,
            isActive: true,
        },
        {
            id: "user-stub-2",
            username: "Bar Bar",
            email: "bar@bar.com",
            isAdmin: false,
            hasFamily: true,
            verified: true,
            isActive: true,
        },
    ];

    async all() {
        return axios
            .get<User[]>("/api/v1/users")
            .then((response) => {
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                return this._stubUsers;
            });
    }

    async find(id: string | null) {
        const userId = id ? id : "me";
        return axios
            .get<User>("/api/v1/users/" + userId)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    console.log("status is not 200", response);
                    return null;
                }
            })
            .catch((reason) => {
                console.log(reason);
                return this._stubUsers.filter((user) => user.id === id)[0];
            });
    }

    async update(id: string | null, value: any) {
        // TODO not impl on server
        console.log(JSON.stringify({id, value}));
    }
}

export default new UserService();
