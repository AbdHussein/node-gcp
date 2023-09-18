import { Message, PubSub } from '@google-cloud/pubsub';
import { sql } from 'drizzle-orm';
import DB from '../db/pg';

const pubsub = new PubSub();

async function pullMessages() {
  const subscriptionName = 'MyFirstSubscription';

  const subscription = pubsub.subscription(subscriptionName);

  // Create an event handler to handle messages
  const messageHandler = (message: Message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);
    DB.client
      .execute(sql`SELECT COUNT(*) FROM public.users`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

  process.on('beforeExit', () => {
    subscription.removeListener('message', messageHandler);
  });
}

export default pullMessages;
