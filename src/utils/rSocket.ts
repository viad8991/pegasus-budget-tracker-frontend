import {
    Encodable,
    encodeRoute,
    Utf8Encoders,
    RSocketClient,
    BufferEncoder,
    BufferEncoders,
    JsonSerializers,
    JsonSerializer,
    APPLICATION_JSON,
    IdentitySerializer,
    encodeCompositeMetadata,
    MESSAGE_RSOCKET_ROUTING,
    encodeSimpleAuthMetadata,
    APPLICATION_OCTET_STREAM,
    encodeAndAddCustomMetadata,
    encodeAndAddWellKnownMetadata,
    MESSAGE_RSOCKET_AUTHENTICATION,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
} from 'rsocket-core';
import RSocketWebSocketClient from "rsocket-websocket-client";
import {ISubscription,} from "rsocket-types/ReactiveStreamTypes";
import {Payload, ReactiveSocket} from "rsocket-types";
import {useAuthStore} from "../store/auth/authStore";
import {Single} from "rsocket-flowable";
import {MAX_REQUEST_COUNT} from "rsocket-core/RSocketFrame";
import {Notification} from "../store/notification/notificatioinTypes";

export class RSocketWebSocket {

    private rSocket: ReactiveSocket<any, any> | null = null;
    private route: string = "api.v1.notification"

    async connect(onMessage: (msg: Notification) => void) {
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
            serializers: {
                data: JsonSerializer,
                metadata: IdentitySerializer,
            },
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
                            const notify: Notification = {id: msg.data.id, body: msg.data.body}
                            onMessage(notify)
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
