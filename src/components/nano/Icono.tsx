interface IconoProps {
  icono: React.ReactNode;
  css?: string;
}

const Icono: React.FC<IconoProps> = ({ icono, css = " " }) => {
  return <span className={`icono ${css}`}>{icono}</span>;
};

export default Icono;
