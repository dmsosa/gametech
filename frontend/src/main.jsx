import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/styles.css";
import "./assets/css/cards.css";
import "./assets/css/control.css";
import ContactForm from "./components/Form/ContactForm/ContactForm";
import BuyRoutes from "./routes/BuyRoutes/BuyRoutes";
import Home from "./routes/BuyRoutes/Home";
import Buy from "./routes/BuyRoutes/Buy";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="gametech">
		<Routes>
        <Route element={<App />}>
            <Route element={<BuyRoutes />}>
              <Route index path="/" element={<Home />}></Route>
              <Route index path="/buy" element={<Buy />}></Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<ContactForm/>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  );		
  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
