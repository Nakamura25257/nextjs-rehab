'use client';

import {ChangeEvent, useState} from 'react';
import styles from './style.module.css';
import {PokemonType} from '@/types/pokemon';

const POKEMON_URL = process.env.NEXT_PUBLIC_POKE_API_URL;

export default function IndexPage(pokemonData: PokemonType) {
  console.log(pokemonData);
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
  const [pokemonUrl, setPokemonUrl] = useState<string>('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setPokemonUrl(POKEMON_URL + value);
    value.length > 0 ? setIsDisabledBtn(false) : setIsDisabledBtn(true);
  };

  const handleSearch = (): void => {
    // pokemonURLでfetch
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
      <div className={styles.mainWrapper}></div>
    </>
  );
}

/**
 * 初期値としてデータ一覧を表示したい
 */
export async function getStaticProps() {
  const res: Response = await fetch(POKEMON_URL + 'pikachu');
  const data: PokemonType = await res.json();
  return {
    props: {
      data,
    },
  };
}
