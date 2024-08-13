import {RSocketClient, JsonSerializer, IdentitySerializer} from 'rsocket-core';
import RSocketWebSocketClient from "rsocket-websocket-client";

const rSocketClient = () => {
    const client = new RSocketClient({
        serializers: {
            data: JsonSerializer,
            metadata: IdentitySerializer,
        },
        setup: {
            keepAlive: 10000,
            lifetime: 20000,
            dataMimeType: 'application/json',
            metadataMimeType: 'message/x.rsocket.routing.v0',
        },
        transport: new RSocketWebSocketClient({
            url: 'ws://localhost:7000/rsocket',
        }),
    });

    return client.connect();
};

export default rSocketClient;
