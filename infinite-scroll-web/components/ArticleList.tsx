import React from "react";

interface ArticleListProps {
  title: string;
}

const ArticleList: React.FC<ArticleListProps> = ({ title }) => {
  return (
    <div className="min-h-[100dvh] p-4 bg-red-300">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default ArticleList;
