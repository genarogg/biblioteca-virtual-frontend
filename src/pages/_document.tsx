import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <title>UNERG | Trabajos</title>
        <meta name="description" content="Trabajos de la UNERG" />
        <meta name="author" content="Genaro Gonzalez" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="UNERG, Trabajos" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/favico.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
