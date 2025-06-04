import Todos from "@/components/todos";
import { getUser } from "@/actions/userAction";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = await currentUser();
  if (!user) return;
  const fetchedData = await getUser(user?.id);
  console.log(fetchedData);

  return (
    fetchedData && (
      <main>
        <Todos todos={fetchedData[0]?.todos || []} user={fetchedData[0]} />
      </main>
    )
  );
}
