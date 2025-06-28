"use client";
import { useState, useEffect } from "react";
import directus from "../lib/directus";
import { readItems } from "@directus/sdk";

interface NewsItem {
  id: number;
  title: string;
  body: string;
  published: boolean;
}

interface Props {
  initialNews: NewsItem[];
}

export default function NewsList({ initialNews }: Props) {
  const [news, setNews] = useState(initialNews);

  useEffect(() => {
    async function refresh() {
      try {
        const data = await directus.request(
          readItems("news", {
            limit: 10,
            filter: { published: { _eq: true } },
            sort: "-sort",
          })
        );
        setNews(data as NewsItem[]);
      } catch (err) {
        console.error("Failed to fetch news", err);
      }
    }

    const unsubscribe = directus.realtime.subscribe(
      "items",
      "news",
      () => {
        refresh();
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ul>
      {news.map((item) => (
        <li key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
