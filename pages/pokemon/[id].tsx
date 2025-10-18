import {useLoading} from '@/app/hooks/useLoading';
import styles from './detail.module.css';
import {SearchResult} from '@/types/pokemon';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {Modal} from '@/app/components/Modal/Modal';

const POKEMON_URL: string | undefined = process.env.NEXT_PUBLIC_POKE_API_URL;

export default function PokemonDetail() {
  const {isLoading, setIsLoading} = useLoading();
  const [pokemonDetail, setPokemonDetail] = useState<SearchResult>();
  const router = useRouter();
  const {id} = router.query; // URLのqueryを取得

  useEffect(() => {
    if (!id) return;
    if (!POKEMON_URL) return;

    // idでポケモン詳細データをfetch
    const fetchPokemonDataById = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(POKEMON_URL + id);
        const data: SearchResult = await res.json();

        setIsLoading(false);
        if (res.ok) {
          setPokemonDetail(data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Failed to fetch:', error.message);
        } else {
          console.error('Unexpected Error:', error);
        }
      }
    };

    fetchPokemonDataById().catch((error: unknown) => console.error(error));
  }, [id]);

  return (
    <div>
      <button
        onClick={() => {
          router.back();
          setIsLoading(true);
        }}
        className={styles.backButton}
      >
        ←back
      </button>

      {isLoading ? (
        <Modal isError={false} message="Loading..." />
      ) : (
        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.name}>{pokemonDetail?.name}</h2>
            <div className={styles.stats}>
              <p>
                <span className={styles.label}>ID:</span> {pokemonDetail?.id}
              </p>
              <p>
                <span className={styles.label}>Height:</span> {pokemonDetail?.height}
              </p>
              <p>
                <span className={styles.label}>Weight:</span> {pokemonDetail?.weight}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
