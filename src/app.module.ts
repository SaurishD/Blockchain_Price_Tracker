import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceModule } from './modules/price/price.module';
import { SwapModule } from './modules/swap/swap.module';
import { AlertModule } from './modules/alert/alert.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler/scheduler.service';
import { SchedulerRepository } from './scheduler/scheduler.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './common/entities/prices.entity';
import { Alert } from './common/entities/alert.entity';

@Module({
  imports: [PriceModule, SwapModule, AlertModule, 
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com', // Replace with your SMTP host
          port: 587, // Replace with your SMTP port
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.GMAIL_SMTP_USERNAME, // Replace with your email
            pass: process.env.GMAIL_SMTP_PASSWORD, // Replace with your email password
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@saurishdarodkar.com>', // Default sender
        },
        template: {
          dir: join(__dirname, 'templates'), // Path to your email templates
          adapter: new HandlebarsAdapter(), // Use Handlebars for templating
          options: {
            strict: true,
          },
        },
      }
    ),
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'postgres',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Price, Alert]),
  ],
  controllers: [AppController],
  providers: [AppService, SchedulerService, SchedulerRepository],
})
export class AppModule {}
