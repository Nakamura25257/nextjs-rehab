'use client';

import {ChangeEvent, useState} from 'react';
import styles from './style.module.css';
import {PokemonLists} from '@/types/pokemon';

const POKEMON_URL: string | undefined = process.env.NEXT_PUBLIC_POKE_API_URL;

export default function IndexPage(pokemonData: PokemonLists) {
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
  const [searchPokemon, setsearchPokemon] = useState<string>('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setsearchPokemon(POKEMON_URL + value);
    value.length > 0 ? setIsDisabledBtn(false) : setIsDisabledBtn(true);
  };

  const handleSearch = (): void => {
    // pokemonURLでfetch
    console.log(searchPokemon);
  };

  return (
    <>
      <div className={styles.searchWrapper}>
        <input type="text" className={styles.searchInput} id="id-search-input" onChange={handleChangeInput} />
        <button
          type="button"
          className={styles.searchBtn}
          id="id-search-btn"
          onClick={handleSearch}
          disabled={isDisabledBtn}
        >
          検索
        </button>
      </div>
      <div className={styles.container}>
        {pokemonData.data.results.map(pokemon => (
          <div key={pokemon.name} className={styles.card}>
            <p className={styles.name}>{pokemon.name}</p>
            <a href={pokemon.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              詳細を見る
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * 初期値としてデータ一覧を表示したい
 */
export async function getStaticProps() {
  const res: Response = await fetch(POKEMON_URL + '?limit=100&offset=0');
  const data: PokemonLists = await res.json();
  return {
    props: {
      data,
    },
  };
}
