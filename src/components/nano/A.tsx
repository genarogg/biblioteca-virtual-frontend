import Link from 'next/link'

interface AProps {
  to: string;
  text: string;
  type?: string;
}

const A: React.FC<AProps> = ({ to, text, type }) => {
  if (type === "a") {
    return (
      <a href={to} target="_blank" rel="noreferrer">
        {text}
      </a>
    );
  }

  return (
    <Link href={to}>{text}</Link>
  )
};

export default A;
