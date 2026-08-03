import { Outlet } from "react-router-dom";
import { BuyFormProvider } from "../../context/buyContext";

function BuyRoutes() {
  return (
	  <BuyFormProvider>
      <Outlet />
    </BuyFormProvider>
  );
}

export default BuyRoutes;
