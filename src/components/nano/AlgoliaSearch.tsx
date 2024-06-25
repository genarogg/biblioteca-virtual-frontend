import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import Link from "next/link";
import React, { useState } from "react";

const searchClient = algoliasearch(
  "XR389U5GJP",
  "33cbef0fbd5de43140870325bff054fe"
);

interface AlgoliaSearchProps {}

const AlgoliaSearch: React.FC<AlgoliaSearchProps> = () => {
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function Hit({ hit }: any) {
    const urlCodificada = encodeURIComponent(hit.titulo);
    return (
      <div className="card-search ">
        <Link href={`/documentos/${urlCodificada}`}>
          <h2>{hit.titulo}</h2>
          <div
            className="descripcion"
            dangerouslySetInnerHTML={{
              __html: hit.descripcion[0].children[0].text,
            }}
          />
          <div className="footer">
            <div className="link">
              <Link href={`/documentos/${urlCodificada}`}>ver publicacion</Link>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="algolia">
      <InstantSearch
        searchClient={searchClient}
        indexName="development_api::trabajo.trabajo"
      >
        <SearchBox
          onChange={(event) => {
            const query = event.currentTarget.value;
            setSearchQuery(query); // Actualiza el estado con el valor actual del campo de búsqueda
            if (query.trim() !== "") setSearchEnabled(true);
            // Activa la búsqueda solo si el campo no está vacío
            else setSearchEnabled(false); // Desactiva la búsqueda si el campo está vacío
          }}
          translations={{ placeholder: 'Buscar documento' }}
        />
        {searchEnabled && searchQuery.trim() !== "" && (
          <div className="container-result ">
            <Hits hitComponent={Hit} />
          </div>
        )}
      </InstantSearch>
    </div>
  );
};

export default AlgoliaSearch;
