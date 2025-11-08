import connectDB from 'config/database';
import { auth } from '@/lib/auth';
import { Message } from 'models/Message';
import { headers } from 'next/headers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Mail } from 'lucide-react';
import { MessagesResults } from 'type';
import MessageCard from '@/components/MessageCard';

const MessagesPage = async () => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const messages = await Message.find({ receiver: session?.user.id })
    .sort({
      createdAt: -1,
    })
    .populate('property', 'name')
    .lean();

  const serializedMessages: MessagesResults[] = JSON.parse(
    JSON.stringify(messages)
  );

  return (
    <section className='p-4 py-24 min-h-screen bg-blue-50'>
      <div className='max-w-6xl mx-auto'>
        <Card className='rounded-md shadow-md gap-3 py-8'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>Your Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {serializedMessages.length === 0 ? (
              <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6'>
                <Mail />
                <AlertTitle>You don&apos;t have any messages.</AlertTitle>
              </Alert>
            ) : (
              serializedMessages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MessagesPage;
