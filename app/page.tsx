import Image from "next/image";

export default async function Home() {
  const database = await fetch(
    `https://daily-beige.cmd.outerbase.io/getDatabase`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
      next: { revalidate: 1 },
    }
  );
  const data = await database.json();
  const { results, next_cursor, has_more } = data;
  console.log(data, "DATA");
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ul>
        {results.map((item: any) => (
          <div key={item.id} className="flex w-[90vw] justify-between">
            <h3>{item.properties.Task.title[0].plain_text}</h3>
            <p>Status: {item.properties.Status.status.name}</p>
            <p>
              Note: {item.properties.Note.rich_text[0]?.plain_text ?? "None"}
            </p>
          </div>
        ))}
      </ul>
    </main>
  );
}
