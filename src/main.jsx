import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerForm from "./customer/CustomerForm.jsx";
import "./global.css";
import PaymentList from "./payments/PaymentsList.jsx";
import PaymentForm from "./payments/PaymentForm.jsx";
import CustomerList from "./customer/CustomerList.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerList />,
  },
  {
    path: "/newCustomer",
    element: <CustomerForm />,
  },
  {
    path: "/payments",
    element: <PaymentList />,
  },
  {
    path: "/newPayment",
    element: <PaymentForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
