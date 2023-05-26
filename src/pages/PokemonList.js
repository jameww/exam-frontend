import { useState, useEffect } from "react";

const PokemonList = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState({});
  const fNum = 1;
  const lNum = 104;

  const skeletonElement = (i) => {
    return (
      <div className="col-2 poke-box" key={i}>
        {!loading[i] ? (
          <>
            <img
              className="img-box"
              src={pokeData[i - 1]?.sprites?.other?.home?.front_default}
              alt={pokeData[i - 1]?.name}
              style={{ height: "auto" }}
            />
            <span className="name-box">{pokeData[i - 1]?.name}</span>
          </>
        ) : (
          <>
            <div className="skeleton img-box"></div>
            <span className="skeleton name-box"></span>
          </>
        )}
      </div>
    );
  };

  useEffect(() => {
    let abortController = new AbortController();

    const fetchPokemonList = async () => {
      for (let i = fNum; i <= lNum; i++) {
        setLoading((prevLoading) => ({
          ...prevLoading,
          [i]: true,
        }));
        await fetchPokeData(i);
      }
    };
    const fetchPokeData = async (id) => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        setPokeData((prevData) => {
          if (!prevData.some((pokemon) => pokemon.id === data.id)) {
            return [...prevData, data];
          }
          return prevData;
        });
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading((prevLoading) => ({
            ...prevLoading,
            [id]: false,
          }));
        }, 250);
      }
    };
    fetchPokemonList();

    return () => abortController.abort();
  }, []);

  const renderSkeleton = () => {
    let skeleton = [];
    for (let i = fNum; i <= lNum; i++) {
      skeleton.push(skeletonElement(i));
    }
    return skeleton;
  };

  return (
    <div className="container">
      <div className="row g-1">{renderSkeleton()}</div>
    </div>
  );
};

export default PokemonList;
