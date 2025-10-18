type Type = {
  type: {
    name: string;
  };
};

export type PokemonLists = {
  data: {
    results: ListResultType[];
  };
};

type ListResultType = {
  name: string;
  url: string;
};

/**
 * ポケモンAPI 検索結果オブジェクト型
 */
export type SearchResult = {
  id: string;
  height: number;
  weight: number;
  name: string;
  types: Type[];
};
