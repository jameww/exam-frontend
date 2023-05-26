import { useState, useEffect } from "react";

const PokemonList = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState({});
  const fNum = 1;
  const lNum = 104;

  const skeletonElement = (i) => {
    return (
      <div className="col-2 poke-box" key={i}>
        {loading[i] === false ? (
          <>
            <img
              className="img-box"
              src={pokeData[i - fNum]?.sprites?.other?.home?.front_default}
              alt={pokeData[i - fNum]?.name}
            />
            <span className="name-box">{pokeData[i - fNum]?.name}</span>
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
    setPokeData([]);
    setLoading({});

    const fetchPokemonList = async () => {
      for (let id = fNum; id <= lNum; id++) {
        setLoading((prevLoading) => ({
          ...prevLoading,
          [id]: true,
        }));
        await fetchPokeData(id);
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
        setLoading((prevLoading) => ({
          ...prevLoading,
          [id]: false,
        }));
      }
    };
    fetchPokemonList();

    return () => abortController.abort();
  }, [fNum, lNum]);

  const renderSkeleton = () => {
    let skeleton = [];
    for (let i = fNum; i <= lNum; i++) {
      skeleton.push(skeletonElement(i));
    }
    return skeleton;
  };

  return (
    <div className="container">
      <div className="row g-3">{renderSkeleton()}</div>
    </div>
  );
};

export default PokemonList;
