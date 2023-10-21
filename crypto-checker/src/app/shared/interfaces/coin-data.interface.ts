export interface CoinData {
  image: {
    large: string;
  };
  name: string;
  symbol: string;
  description: {
    en: string;
  };
  community_score: number;
  market_cap_rank: number;
  liquidity_score: number;
  hashing_algorithm: string;
  public_interest_score: number;
}
