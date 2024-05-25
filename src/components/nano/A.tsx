import Link from "next/link";

interface AProps {
  to: string;

  type?: string;
  children?: React.ReactNode;
  css?: string;
}

const A: React.FC<AProps> = ({ to, type, children, css }) => {
  if (type === "a") {
    return (
      <a href={to} className={css} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={css} href={to}>
      {children}
    </Link>
  );
};

export default A;
