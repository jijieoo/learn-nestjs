import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/core/dtos/user/create-user.dto';
import { Order } from 'src/core/entities/order.entity';
import { Repository } from 'typeorm';
import { User } from '../../core/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find({
            relations: [
                'heroes',
                'match_records',
                'sell_records',
                'buy_records',
            ],
        });
    }

    /**
     * 新增用户
     * @param {CreateUserDto} createUserDto 新增用户信息
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.usersRepository.save(createUserDto);
    }

    findByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({ username });
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    /**
     * 用户购买英雄
     * @param userId 用户ID
     * @param transactionId 订单ID
     */
    async buyHero(
        orderId: number,
        userId: number,
        heroId: number,
        heroPrice: number,
    ): Promise<void> {
        // TODO: 添加身份判断，选手才可以买

        // 更新关联信息
        await this.usersRepository
            .createQueryBuilder()
            .relation(Order, 'buyer')
            .of(orderId)
            .set(userId);

        await this.usersRepository
            .createQueryBuilder()
            .relation(Order, 'hero')
            .of(orderId)
            .set(heroId);

        await this.usersRepository
            .createQueryBuilder()
            .relation(User, 'heroes')
            .of(userId)
            .add(heroId);

        // 更新用户余额
        await this.usersRepository
            .createQueryBuilder()
            .update(User)
            .set({
                balance: () => `balance - ${heroPrice}`,
            })
            .where('id = :id', { id: userId })
            .execute();
    }

    /**
     * 用户卖出英雄
     * @param userId 用户ID
     * @param orderId 订单ID
     */
    async sellHero(
        orderId: number,
        userId: number,
        heroPrice: number,
    ): Promise<void> {
        // 跟新关联表信息
        await this.usersRepository
            .createQueryBuilder()
            .relation(Order, 'seller')
            .of(orderId)
            .set(userId);

        // 更新用户余额
        await this.usersRepository
            .createQueryBuilder()
            .update(User)
            .set({
                balance: () => `balance + ${heroPrice}`,
            })
            .where('id = :id', { id: userId })
            .execute();
    }

    /**
     * 查询用户余额
     * @param userId 用户ID
     */
    async checkUserBalance(userId: number): Promise<number> {
        const user = await this.usersRepository.findOne(userId);
        return user.balance;
    }

    /**
     * 查询用户余额是否可以购买英雄
     * @param userId 用户ID
     * @param heroPrice 要购买的英雄价格
     */
    async checkUserBalanceIsEnough(
        userId: number,
        heroPrice: number,
    ): Promise<boolean> {
        const userBalance = await this.checkUserBalance(userId);
        if (userBalance < heroPrice) {
            throw new HttpException(
                'user balance not enough',
                HttpStatus.EXPECTATION_FAILED,
            );
        }
        return true;
    }
}
