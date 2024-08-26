import {ReactiveSocket} from 'rsocket-types';
import {ISubscription} from 'rsocket-types/ReactiveStreamTypes';
import {encodeCompositeMetadata, encodeRoute, MESSAGE_RSOCKET_ROUTING} from 'rsocket-core';
import {createRSocketClient} from "../utils/rSocket";
import {Notification} from "../store/notification/notificatioinTypes";

export class NotificationService {
    private rSocket: ReactiveSocket<any, any> | null = null;
    private readonly route: string;

    constructor(route: string) {
        this.route = route;
    }

    async connect(onMessage: (msg: Notification) => void): Promise<void> {
        const client = createRSocketClient(this.route);

        return new Promise((resolve, reject) => {
            client.connect().subscribe({
                onComplete: (socket) => {
                    this.rSocket = socket;
                    this.subscribeToNotifications(onMessage);
                    resolve();
                },
                onError: (error: Error) => {
                    console.error("Failed to connect:", error);
                    reject(error);
                },
                onSubscribe: () => console.log("RSocket client subscribed"),
            });
        });
    }

    private subscribeToNotifications(onMessage: (msg: Notification) => void) {
        if (!this.rSocket) {
            console.error("RSocket not connected");
            return;
        }

        this.rSocket.requestStream({
            metadata: encodeCompositeMetadata([
                [MESSAGE_RSOCKET_ROUTING, encodeRoute(this.route)],
            ]),
        }).subscribe({
            onSubscribe: (sub: ISubscription) => {
                sub.request(0x7fffffff); // Request max number of items
            },
            onNext: (msg) => {
                const notify: Notification = {id: msg.data.id, body: msg.data.body};
                onMessage(notify);
            },
            onComplete: () => console.log("Notification stream completed"),
            onError: (e: Error) => console.error("Error in notification stream:", e),
        });
    }
}
