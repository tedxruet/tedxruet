export const metadata = {
  title: "404 | TEDxRUET",
  description: "The page you are looking for does not exist",
};

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-140px) md:h-[calc(100vh-90px)]">
      <h1 className="text-5xl dark:text-white text-gray-900">404</h1>
      <p className="text-2xl dark:text-gray-300 text-gray-700">
        Page not found
      </p>
      <p className="text-lg dark:text-gray-500 text-gray-600 mt-2">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
