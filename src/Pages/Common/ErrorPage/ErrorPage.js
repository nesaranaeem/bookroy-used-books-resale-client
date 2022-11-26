import React from "react";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div class="grid h-screen px-4 bg-white place-content-center">
      <div class="text-center">
        <h1 class="font-black text-gray-200 text-9xl">{error.status}</h1>

        <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {error.statusText}
        </p>
        {error.data?.message && (
          <p className="mt-4 text-gray-500">{error.data.message}</p>
        )}

        <Link
          to="/"
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back To Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
