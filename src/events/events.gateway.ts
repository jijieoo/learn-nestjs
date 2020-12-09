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
import { Server, Socket } from 'socket.io';
import { TestUsersService } from 'src/modules/test-users/test-users.service';

@WebSocketGateway()
export class EventGateway implements OnGatewayConnection {
    constructor(private testUsersService: TestUsersService) {
        this.roomId = '123';
    }
    @WebSocketServer()
    server: Server;

    private roomId: string;

    private logger: Logger = new Logger('WS');

    @SubscribeMessage('events')
    test(@MessageBody() data: any): Observable<WsResponse<number>> {
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

    public async handleConnection(client: Socket) {
        client.join(this.roomId);
        this.logger.log(`a client connected ${client.id}`);
        this.server.to(this.roomId).emit('notice', { data: '有新的用户加入' });
        const users = await this.testUsersService.findAll();
        this.server.to(this.roomId).emit('allUsers', { data: users });
    }
}
