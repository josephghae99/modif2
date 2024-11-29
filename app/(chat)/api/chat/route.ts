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

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  try {
    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
