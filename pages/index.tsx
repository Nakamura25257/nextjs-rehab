'use client';

import {ChangeEvent, useState} from 'react';
import styles from './style.module.css';
import {PokemonLists, SearchResult} from '@/types/pokemon';
import {Modal} from '@/app/components/Modal/Modal';
import {useLoading} from '@/app/hooks/useLoading';

const POKEMON_URL: string | undefined = process.env.NEXT_PUBLIC_POKE_API_URL;

export default function IndexPage(pokemonData: PokemonLists) {
  const {isLoading, setIsLoading} = useLoading();
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
  const [searchPokemon, setsearchPokemon] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult>(); // 検索結果用Hooks
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const value: string = e.target.value;
    setsearchPokemon(POKEMON_URL + value.toLowerCase());
    value ? setIsDisabledBtn(false) : setIsDisabledBtn(true);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(searchPokemon);
      const data: SearchResult = await res.json();
      setIsLoading(false);
      setSearchResult(data);
      setErrorMessage('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to fetch:', error.message);
        setErrorMessage('該当のキャラクターは見つかりませんでした。'); // res.statusで場合分けができないため、エラーは全て404と想定した上でハンドリング
      } else {
        console.error('Unexpected error', error);
      }
    }
  };

  return (
    <>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          id="id-search-input"
          onChange={handleChangeInput}
          placeholder="please input the Pokemon name"
        />
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

      {errorMessage ? (
        <Modal isError={true} message={errorMessage} />
      ) : isLoading ? (
        <Modal isError={false} message="Loading" />
      ) : searchResult ? (
        <div className={styles.resultWrapper}>
          <p>{searchResult.name}</p>
        </div>
      ) : (
        <>
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
      )}
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
