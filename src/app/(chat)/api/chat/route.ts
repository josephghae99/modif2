import { Message } from "ai";

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Array<Message> } =
    await request.json();

  const lastMessage = messages[messages.length - 1].content;

  try {
    const response = await fetch('https://dify.attirer.fr/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DIFY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: lastMessage,
        response_mode: 'streaming',
        user: "anonymous-user",
        conversation_id: id,
        inputs: {}
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Dify API error:', errorData);
      throw new Error(`API error: ${response.statusText}`);
    }

    return response;

  } catch (error) {
    console.error('Error:', error);
    return new Response('Error processing your request', { status: 500 });
  }
}