export default async function Home() {
  const database = await fetch(
    `https://daily-beige.cmd.outerbase.io/getDatabase`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
    }
  );
  const data = await database.json();
  const { results } = data;
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center text-center justify-center p-24">
        <h1 className="font-bold text-xl mb-10">Submission Checklist </h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Task</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {results
              .slice()
              .reverse()
              .map((item: any) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">
                    {item.properties.Task.title[0].plain_text}
                  </td>
                  <td className="px-4 py-2">
                    {item.properties.Status.status.name}
                  </td>
                  <td className="px-4 py-2">
                    {item.properties.Note.rich_text[0]?.plain_text ?? ""}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
