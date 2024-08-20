import {
    Encodable,
    encodeRoute,
    RSocketClient,
    BufferEncoder,
    JsonSerializer,
    APPLICATION_JSON,
    IdentitySerializer,
    encodeCompositeMetadata,
    MESSAGE_RSOCKET_ROUTING,
    encodeSimpleAuthMetadata,
    APPLICATION_OCTET_STREAM,
    encodeAndAddCustomMetadata,
    MESSAGE_RSOCKET_AUTHENTICATION,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
} from 'rsocket-core';
import RSocketWebSocketClient from "rsocket-websocket-client";
import {ISubscription,} from "rsocket-types/ReactiveStreamTypes";
import {Payload} from "rsocket-types";
import {useAuthStore} from "../store/auth/authStore";

export class RSocketWebSocket {

    private client: RSocketClient<any, any> | null = null;
    private rSocket: any = null;
    private route: string = "api.v1.notification"

    async connect(): Promise<void> {
        const token = useAuthStore().token || ""
        console.log("token", token)

        const client = new RSocketClient<Buffer, Buffer>({
            setup: {
                keepAlive: 10000,
                lifetime: 20000,
                dataMimeType: APPLICATION_JSON.string,                          // APPLICATION_OCTET_STREAM.string
                metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,    // 'message/x.rsocket.routing.v0',
                payload: {
                    data: undefined,
                    metadata: encodeCompositeMetadata([
                        [MESSAGE_RSOCKET_ROUTING, encodeRoute(this.route)],
                        [MESSAGE_RSOCKET_AUTHENTICATION, encodeSimpleAuthMetadata("username", token)],
                    ])
                }
            },
            // serializers: {
            //     data: JsonSerializer,
            //     metadata: IdentitySerializer,
            // },
            transport: new RSocketWebSocketClient({
                url: 'ws://localhost:7000',
                debug: true,
                wsCreator: url => new WebSocket(url),
            }, BufferEncoder),
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

        const routingMetadata = String.fromCharCode(this.route.length) + this.route;
        const authMetadata = String.fromCharCode(token.length) + token;

        const metadata = encodeAndAddCustomMetadata(
            Buffer.alloc(0),
            MESSAGE_RSOCKET_AUTHENTICATION.string,
            encodeSimpleAuthMetadata("", token)
        );

        console.log("token", token, "metadata", metadata,)
        this.rSocket.connectionStatus().subscribe(event => console.log("event", event.error.message))

        this.rSocket.requestStream({
            // data: Buffer.from('request-stream'),
            metadata: encodeCompositeMetadata([
                [MESSAGE_RSOCKET_ROUTING, encodeRoute(this.route)],
                [MESSAGE_RSOCKET_AUTHENTICATION, encodeSimpleAuthMetadata('user', token)],
            ]),
        }).subscribe({
            onSubscribe: (sub: ISubscription) => {
                console.log("sub", sub)
                sub.request(0x7fffffff);
            },
            onNext: (msg: Payload<string, string>) => {
                console.log("next", msg)
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
