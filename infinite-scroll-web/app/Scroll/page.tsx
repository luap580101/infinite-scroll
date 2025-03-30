"use client";

import ArticleList from "@/components/ArticleList";
import React, { useState, useEffect } from "react";

export default function Scroll() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([{ title: 1 }]);

  const fetchMoreItems = () => {
    window.alert("fetchMoreItems");
    setIsLoading(true);
    setTimeout(() => {
      setItems((prevItems) => [...prevItems, { title: items.length + 1 }]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight;
      const scrolledHeight = window.innerHeight + window.scrollY;
      if (scrolledHeight >= scrollableHeight - 100 && !isLoading) {
        console.log("觸發");
        fetchMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  return (
    <div>
      <div className=" items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        Scroll
      </div>
      <div className=" flex flex-col gap-8">
        {items.map((item, index: number) => (
          <ArticleList key={index} title={item.title} />
        ))}
        {isLoading && <div className="p-4 text-center">Loading...</div>}
      </div>
    </div>
  );
}
