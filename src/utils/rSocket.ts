import {
    RSocketClient,
    JsonSerializer,
    IdentitySerializer,
    APPLICATION_JSON,
    MESSAGE_RSOCKET_ROUTING, Encodable, MESSAGE_RSOCKET_AUTHENTICATION
} from 'rsocket-core';
import RSocketWebSocketClient from "rsocket-websocket-client";
import {ISubscription,} from "rsocket-types/ReactiveStreamTypes";
import {Payload} from "rsocket-types";
import {useAuthStore} from "../store/auth/authStore";

export class RSocketWebSocket {

    private client: RSocketClient<string, Encodable> | null = null;
    private rSocket: any = null;

    async connect(): Promise<void> {
        const client = new RSocketClient({
            setup: {
                keepAlive: 10000,
                lifetime: 20000,
                dataMimeType: APPLICATION_JSON.string,
                metadataMimeType: MESSAGE_RSOCKET_ROUTING.string // 'message/x.rsocket.routing.v0',
            },
            serializers: {
                data: JsonSerializer,
                metadata: IdentitySerializer,
            },
            transport: new RSocketWebSocketClient({
                url: 'ws://localhost:7000/',
                debug: true,
                wsCreator: (url) => {
                    return new WebSocket(url);
                }
            }),
        });

        this.client = client;

        return new Promise((resolve, reject) => {
            client.connect().subscribe({
                onComplete: (socket) => {
                    console.log("connect", socket)
                    this.rSocket = socket;
                    resolve()
                },
                onError: (error) => {
                    console.log("error", error)
                    reject(error);
                }
            });
        })
    }

    requestStream(route: string) {
        const token = useAuthStore().token || ""
        const routingMetadata = String.fromCharCode(route.length) + route;
        const authMetadata = String.fromCharCode(token.length) + token;

        const metadata = `${String.fromCharCode(routingMetadata.length)}${routingMetadata}${String.fromCharCode(
            MESSAGE_RSOCKET_AUTHENTICATION.string.length)}${MESSAGE_RSOCKET_AUTHENTICATION.string}${authMetadata}`;

        console.log("metadata", metadata)

        return this.rSocket.requestStream({
            data: null,
            metadata: metadata,
        });
    }

    onNotification(onMessage: (msg: any) => void) {
        const token = useAuthStore().token || ""
        const route: string = "api.v1.notification"

        const routingMetadata = String.fromCharCode(route.length) + route;
        const authMetadata = String.fromCharCode(token.length) + token;
        const metadata = `${String.fromCharCode(routingMetadata.length)}${routingMetadata}${String.fromCharCode(MESSAGE_RSOCKET_AUTHENTICATION.string.length)}${MESSAGE_RSOCKET_AUTHENTICATION.string}${authMetadata}`;

        console.log("metadata", metadata)

        const payload: Payload<null, string> = {
            data: null,
            metadata: metadata,
        };

        this.rSocket.requestStream(payload).subscribe({
            onSubscribe: (sub: ISubscription) => {
                sub.request(0x7fffffff);
            },
            onNext: (msg: Payload<string, string>) => {
                onMessage(msg);
            },
            onComplete: () => {
                console.log("onComplete")
            },
            onError: (e: Error) => {
                console.log("onError", e);
            }
        });
    }

}
