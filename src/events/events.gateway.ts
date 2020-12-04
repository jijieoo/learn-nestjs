import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('connect')
    connect(@MessageBody() data: any): Observable<WsResponse<boolean>> {
        console.log('a client connected..', data);
        return of({
            event: 'connect',
            data: true,
        });
    }

    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
        console.log(data);
        return from([1, 2, 3]).pipe(
            map(item => {
                return { event: 'events', data: item };
            }),
        );
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        return data;
    }
}
