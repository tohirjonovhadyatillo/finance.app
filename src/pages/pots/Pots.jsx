import "./Pots.scss";
import { useCollection } from "../../hooks/useCollection";
function Pots() {
  const { data } = useCollection("transactions");
  return <div>Pots</div>;
}

export default Pots;
