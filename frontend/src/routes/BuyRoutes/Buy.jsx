import { Container } from "react-bootstrap";
import BannerContainer from "../../components/BannerContainer";
import BuyForm from "../../components/Form/BuyForm/BuyForm";

function Buy() {
  return (
	<>
    <BannerContainer>
      <h2 className="logo-font">Finish your order</h2>
      <p className="text-start d-block">And enjoy your time.</p>
    </BannerContainer>
		<Container>
			<BuyForm></BuyForm>
		</Container>
	</>
  );
}

export default Buy;
