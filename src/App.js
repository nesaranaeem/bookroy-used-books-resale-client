import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
function App() {
  return (
    <div className="max-w-full xl:max-w-6xl mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>BookRoy - Resale Your Books</title>
        <meta
          name="description"
          content="BookRoy is a platform for resale used books"
        />
      </Helmet>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
