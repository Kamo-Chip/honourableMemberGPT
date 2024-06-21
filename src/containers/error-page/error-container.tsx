import Plug from "../plug/plug";
type ErrorPageProps = {
  error: string;
  content: string;
};
const ErrorPage = ({ error, content }: ErrorPageProps) => {
  return (
    <div className="flex items-center justify-center h-screen w-full px-4">
      <div>
        <h1 className="text-8xl font-medium text-center">{error} ⚠️</h1>
        <span className="m-auto text-center flex">{content}</span>
      </div>
      <Plug position="fixed bottom-0 left-0" />
    </div>
  );
};

export default ErrorPage;
