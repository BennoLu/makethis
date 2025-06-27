import { Metadata } from "next";

interface NewsItem {
  id: number;
  title: string;
  body: string;
  published: boolean;
}

export const metadata: Metadata = {
  title: "News",
};

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch(
    "http://localhost:8055/items/news?limit=10&filter[published][_eq]=true&sort=-created_at",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const json = await res.json();
  return json.data as NewsItem[];
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div>
      <h1>News</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
