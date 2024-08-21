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
    MESSAGE_RSOCKET_COMPOSITE_METADATA, encodeAndAddWellKnownMetadata, JsonSerializers, BufferEncoders,
} from 'rsocket-core';
import RSocketWebSocketClient from "rsocket-websocket-client";
import {ISubscription,} from "rsocket-types/ReactiveStreamTypes";
import {Payload, ReactiveSocket} from "rsocket-types";
import {useAuthStore} from "../store/auth/authStore";
import {Single} from "rsocket-flowable";
import {MAX_REQUEST_COUNT} from "rsocket-core/RSocketFrame";

export class RSocketWebSocket {

    // private client: RSocketClient<any, any> | null = null;
    private rSocket: ReactiveSocket<any, any> | null = null;
    private route: string = "api.v1.notification"

    async connect(onMessage: (msg: any) => void) {
        const token = useAuthStore().token || ""
        console.log("token", token)

        const client = new RSocketClient({
            setup: {
                keepAlive: 10000,
                lifetime: 20000,
                dataMimeType: APPLICATION_JSON.string,
                metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string, // MESSAGE_RSOCKET_AUTHENTICATION.string,
                payload: {
                    // metadata: encodeSimpleAuthMetadata("user", token)
                    metadata: encodeCompositeMetadata([
                        [MESSAGE_RSOCKET_ROUTING, encodeRoute(this.route)],
                        [MESSAGE_RSOCKET_AUTHENTICATION, encodeSimpleAuthMetadata("", token)],
                    ])
                }
            },
            // serializers:{
            //     data: JsonSerializer,
            //     metadata: IdentitySerializer,
            // },
            transport: new RSocketWebSocketClient({
                url: 'ws://localhost:7000',
                wsCreator: (url) => {
                    return new WebSocket(url);
                }
            }, BufferEncoders)
        });

        console.log("create client", client)

        new Promise((resolve, reject) => {
            client.connect().subscribe({
                onComplete: (socket) => {
                    console.log("on complete connection, get socket", socket)
                    this.rSocket = socket;
                    socket.requestStream({
                        metadata: encodeCompositeMetadata([
                            [MESSAGE_RSOCKET_ROUTING, encodeRoute(this.route)],
                        ])
                    }).subscribe({
                        onSubscribe: (sub: ISubscription) => {
                            console.log("onSubscribe")
                            sub.request(0x7fffffff);
                        },
                        onNext: (msg) => {
                            console.log("on next", msg);
                            onMessage(msg)
                        },
                        onComplete: () => {
                            console.log("onComplete")
                        },
                        onError: (e: Error) => {
                            console.log("onError", e);
                        }
                    });
                    // resolve()
                },
                onError: (error) => {
                    console.log("connect on error", error)
                    reject(error);
                },
                onSubscribe(cancel) {
                    console.log("on subscribe")
                },
            });
        })
    }

    // requestStream(route: string) {
    //     const token = useAuthStore().token || ""
    //     const routingMetadata = String.fromCharCode(route.length) + route;
    //     const authMetadata = String.fromCharCode(token.length) + token;
    //
    //     const metadata = `${String.fromCharCode(routingMetadata.length)}${routingMetadata}${String.fromCharCode(
    //         MESSAGE_RSOCKET_AUTHENTICATION.string.length)}${MESSAGE_RSOCKET_AUTHENTICATION.string}${authMetadata}`;
    //
    //     console.log("metadata", metadata)
    //
    //     return this.rSocket.requestStream({
    //         data: null,
    //         metadata: metadata,
    //     });
    // }

    async onNotification(onMessage: (msg: any) => void) {
        this.rSocket.requestStream({
            metadata: encodeCompositeMetadata([
                [MESSAGE_RSOCKET_ROUTING, encodeRoute(this.route)],
            ])
        }).subscribe({
            onSubscribe: (sub: ISubscription) => {
                console.log("onSubscribe")
                sub.request(0x7fffffff);
            },
            onNext: (msg) => {
                console.log("on next", msg);
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
