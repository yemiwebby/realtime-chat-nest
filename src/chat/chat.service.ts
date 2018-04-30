import { Component } from '@nestjs/common';


const Sentiment = require('sentiment');

@Component()
export class ChatService {
    
    addMessage(data) {
        const Pusher = require('pusher');
        const sentiment = new Sentiment();
        const sentimentScore = sentiment.analyze(data.message).score;

        const chat = {
            user: data.user,
            message: data.message,
            sentiment: sentimentScore
        }

        var pusher = new Pusher({
            appId: 'YOUR_APP_ID',
            key: 'YOUR_API_KEY',
            secret: 'YOUR_SECRET_KEY',
            cluster: 'CLUSTER',
            encrypted: true
          });

          pusher.trigger('chats', 'new-chat', chat);
    }
}