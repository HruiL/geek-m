import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "@pages/home";
import Login from "@pages/login";
import MainLayout from "@shared/mainLayout";
import Question from "@pages/question";
import Video from "@pages/video";
import Mine from "@pages/mine";
import AuthRoute from "@router/authRoute";
import Personal from "@pages/personal";
import Search from "@pages/search";
import SearchResult from "@pages/search/searchResult";
import Article from "@pages/article";
import Chat from "@pages/chat";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"/0"} />,
      },
      {
        path: ":cid",
        element: <HomePage />,
      },
      {
        path: "question",
        element: <Question />,
      },
      {
        path: "video",
        element: <Video />,
      },
      {
        path: "mine",
        element: <AuthRoute>{<Mine />}</AuthRoute>,
      },
    ],
  },
  {
    path: "/private",
    element: <AuthRoute />,
    children: [
      {
        path: "personal",
        element: <Personal />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/result/:key",
    element: <SearchResult />,
  },
  {
    path: "/article/:id",
    element: <Article />,
  },
]);
function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
