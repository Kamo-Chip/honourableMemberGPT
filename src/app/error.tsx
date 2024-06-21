"use client";

import ErrorPage from "@/containers/error-page/error-container";

const Page = () => {
  return (
    <ErrorPage
      error="500"
      content="This one's my fault. While you're here check out my YouTube channel by clicking the icon on the bottom left 🤓"
    />
  );
};

export default Page;
