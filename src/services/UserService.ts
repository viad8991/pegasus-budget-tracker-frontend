import { User } from "../store/user/types/userTypes";
import axios from "../axios";

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
        // TODO
        // Постоянно писать это надоесть и много кода образуется в service-ах
        // Нужно вынести в настройки http-client-a в отдельный файл
        // Напиши, скину пример
        return axios
            .get<User[]>("/api/v1/user")
            .then((response) => {
                return response.data;
            })
            .catch((reason) => {
                console.log(reason);
                return this._stubUsers;
            });
    }

    async find(id: string) {
        return axios
            .get<User>("/api/v1/user/" + id)
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
        console.log(JSON.stringify({ id, value }));
    }
}

export default new UserService();
