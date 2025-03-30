"use client";

import ArticleList from "@/components/ArticleList";
import React, { useState, useEffect, useRef } from "react";

export default function Intersection() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([{ title: 1 }]);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreItems = () => {
    window.alert("fetchMoreItems");
    setIsLoading(true);
    setTimeout(() => {
      setItems((prevItems) => [...prevItems, { title: items.length + 1 }]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (lastItemRef.current) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          fetchMoreItems();
        }
      };

      observer.current = new IntersectionObserver(handleObserver, options);
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (observer.current && lastItemRef.current) {
        observer.current.unobserve(lastItemRef.current);
      }
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

        <div ref={lastItemRef}>
          {isLoading && <div className="p-4 text-center">Loading...</div>}
        </div>
      </div>
    </div>
  );
}
