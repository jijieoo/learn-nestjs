import { Logger } from '@nestjs/common';
import {
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WsUserDto } from 'src/core/dtos/user/ws-user.dto';
import { Server } from 'ws';

@WebSocketGateway()
export class EventGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('WS');

    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
        console.log(data);
        return from([1, 2, 3]).pipe(
            map(item => {
                return { event: 'events', data: item };
            }),
        );
    }

    @SubscribeMessage('addUser')
    addUser(
        @MessageBody() data: WsUserDto,
    ): Observable<WsResponse<WsUserDto[]>> {
        return;
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        return data;
    }

    public handleConnection(client: WebSocket) {
        this.logger.log(`a client connected: ${client.protocol}`);
    }
}
