import BannerContainer from "../../components/BannerContainer";
import BuyPreview from "../../components/Form/BuyForm/BuyPreview";
import Index from "../../components/Home/Index";
import ItemsArray from "../../components/ItemsArray/ItemsArray";
import { Container } from "react-bootstrap";

function Home() {

	return (
	<>
		<BannerContainer>
			<h1 className="logo-font">Gamemaster S.E.</h1>
			<p><span className="fst-italic text-emphasis fw-normal">"No matter what, you have to find something to fight for."</span></p>
			<p className="fst-italic">Joel - The Last of Us</p>
		</BannerContainer>
		<Container>
			<Index></Index>
		</Container>
		<Container>
			<BuyPreview></BuyPreview>
			<ItemsArray></ItemsArray>
		</Container>
	</>
	);
}

export default Home;
