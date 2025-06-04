import { getData } from "@/actions/todoAction";
import { getAllUsers, getUser } from "@/actions/userAction";
import Todos from "@/components/todos";

export default async function Home() {
  const users = await getAllUsers();
  console.log(users)
  const data = await getData(users[0].id);

  const user = await getUser(users[0].id)
  console.log(user);
  return (
    <main>
      <Todos todos={data} user={users[0]} />
    </main>
  );
}
