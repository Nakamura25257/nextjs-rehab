type Type = {
  type: {
    name: string;
  };
};

// 実際に使用する部分のみ型定義
export type PokemonType = {
  data: {id: number; height: number; weight: number; name: string; types: Type[]};
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
