import { Icono, A } from "@nano";

import Circle from "./Circle";

interface CardStadisticaProps {
  estadistica: number;
  icono: React.ReactNode;
  text: string;
  color: string;
  url: string;
}

const CardStadistica: React.FC<CardStadisticaProps> = ({
  estadistica,
  icono,
  text,
  color,
  url,
}) => {
  return (
    <A css="card" to={url}>
      {/*  <div className="container-icono">
        <Icono icono={icono} />
      </div> */}
      <h2 style={{ color: color }}>{text}</h2>
      <div className="estadistica">
        <Circle percentage={estadistica} color={color} />
      </div>
    </A>
  );
};

export default CardStadistica;
