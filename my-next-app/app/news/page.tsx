import { Metadata } from "next";
import dynamic from "next/dynamic";

const NewsList = dynamic(() => import("../../components/NewsList"), {
  ssr: false,
});

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
    "http://localhost:8055/items/news?limit=10&filter[published][_eq]=true&sort=-sort",
    { cache: "no-store" }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Error response body:", errorText);
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
      <NewsList initialNews={news} />
    </div>
  );
}
