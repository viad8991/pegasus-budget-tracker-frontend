import {
    RSocketClient,
    encodeRoute,
    encodeCompositeMetadata,
    encodeSimpleAuthMetadata,
    APPLICATION_JSON,
    MESSAGE_RSOCKET_ROUTING,
    MESSAGE_RSOCKET_AUTHENTICATION,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    JsonSerializer,
    IdentitySerializer,
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import {useAuthStore} from "../store/auth/authStore";
import {BufferEncoders} from 'rsocket-core';

export function createRSocketClient(route: string): RSocketClient<any, any> {
    const token = useAuthStore().token || "";

    return new RSocketClient({
        setup: {
            keepAlive: 10000,
            lifetime: 20000,
            dataMimeType: APPLICATION_JSON.string,
            metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
            payload: {
                metadata: encodeCompositeMetadata([
                    [MESSAGE_RSOCKET_ROUTING, encodeRoute(route)],
                    [MESSAGE_RSOCKET_AUTHENTICATION, encodeSimpleAuthMetadata("", token)],
                ])
            }
        },
        serializers: {
            data: JsonSerializer,
            metadata: IdentitySerializer,
        },
        transport: new RSocketWebSocketClient(
            {
                url: 'ws://localhost:7000',
                wsCreator: (url) => new WebSocket(url),
            },
            BufferEncoders
        )
    });
}
