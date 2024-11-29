import { Chat } from "../../../../components/custom/chat";

export default function Page({ params }: { params: any }) {
  const { id } = params;
  return <Chat id={id} initialMessages={[]} />;
}
