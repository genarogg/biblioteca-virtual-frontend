import { A } from "@nano";

import Circle from "./Circle";

interface CardStadisticaProps {
  estadistica: number;
  text: string;
  color: string;
  url: string;
  cantidad: number;
}

const CardStadistica: React.FC<CardStadisticaProps> = ({
  estadistica,
  text,
  color,
  url,
  cantidad,
}) => {
  return (
    <div className="card">
      <div className="header">
        <h2 style={{ color: color }}>{text}</h2>
        <div className="estadistica">
          <Circle percentage={estadistica} color={color} cantidad={cantidad} />
        </div>
      </div>

      <A to={url}>consultar recursos</A>
    </div>
  );
};

export default CardStadistica;
