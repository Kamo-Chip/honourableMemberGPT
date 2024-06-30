import ErrorPage from "@/components/containers/error-page/error-container";

const Page = () => {
  return (
    <ErrorPage
      error="404"
      content="It's either my fault or you were trying to be clever. I don't know about you, but I'm leaning more towards the latter 🤔"
    />
  );
};

export default Page;
