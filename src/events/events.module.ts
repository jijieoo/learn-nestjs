import { Module } from '@nestjs/common';
import { TestUsersModule } from 'src/modules/test-users/test-users.module';
import { EventGateway } from './events.gateway';

@Module({
    imports: [TestUsersModule],
    providers: [EventGateway],
})
export class EventModule {}
