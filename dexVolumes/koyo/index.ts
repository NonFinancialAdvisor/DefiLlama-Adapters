import { DexVolumeAdapter } from "../dexVolume.type";
import { AURORA, BOBA } from "../helper/chains";
import { getChainVolume } from "../helper/getUniSubgraphVolume";

const endpoints = {
  [BOBA]:
    "https://thegraph.com/hosted-service/subgraph/koyo-finance/exchange-subgraph-boba",
  [AURORA]:
    "https://thegraph.com/hosted-service/subgraph/koyo-finance/exchange-subgraph-aurora",
};

const graphs = getChainVolume({
  graphUrls: endpoints,
  totalVolume: {
    factory: "koyos",
    field: "totalSwapVolume",
  },
  hasDailyVolume: false,
});

const adapter: DexVolumeAdapter = {
  volume: {
    [BOBA]: {
      fetch: graphs(BOBA),
      start: async()=> 1655104044,
      customBackfill: undefined,
    },
    [AURORA]: {
      fetch: graphs(AURORA),
      start: async()=> 1657617165,
      customBackfill: undefined,
    },
  },
};

export default adapter;
