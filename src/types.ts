// types.ts for Midgard API

export interface HealthStatus {
  database: boolean;
  scannerHeight: string;
  inSync: boolean;
  lastThorNode: HeightTS;
  lastFetched: HeightTS;
  lastCommitted: HeightTS;
  lastAggregated: HeightTS;
  genesisInfo?: GenesisInfo;
}

interface HeightTS {
  height: number;
  timestamp: number;
}

interface GenesisInfo {
  height: number;
  hash: string;
}

export interface ChurnInfo {
  height: string;
  date: string;
}

export interface KnownPoolsInfo {
  [asset: string]: string;
}

export interface PoolDetail {
  asset: string;
  volume24h: string;
  assetDepth: string;
  runeDepth: string;
  assetPrice: string;
  assetPriceUSD: string;
  poolAPY: string;
  annualPercentageRate: string;
  earnings: string;
  earningsAnnualAsPercentOfDepth: string;
  lpLuvi: string;
  saversAPR: string;
  status: string;
  liquidityUnits: string;
  synthUnits: string;
  synthSupply: string;
  units: string;
  nativeDecimal: string;
  saversUnits: string;
  saversDepth: string;
  totalCollateral: string;
  totalDebtTor: string;
  saversYieldShare?: string;
}

export interface PoolStats extends PoolDetail {
  toAssetVolume: string;
  toRuneVolume: string;
  swapVolume: string;
  toAssetCount: string;
  toRuneCount: string;
  swapCount: string;
  uniqueSwapperCount: string;
  toAssetAverageSlip: string;
  toRuneAverageSlip: string;
  averageSlip: string;
  toAssetFees: string;
  toRuneFees: string;
  totalFees: string;
  addAssetLiquidityVolume: string;
  addRuneLiquidityVolume: string;
  addLiquidityVolume: string;
  addLiquidityCount: string;
  withdrawAssetVolume: string;
  withdrawRuneVolume: string;
  withdrawVolume: string;
  withdrawCount: string;
  uniqueMemberCount: string;
}

export interface DepthHistory {
  meta: DepthHistoryMeta;
  intervals: DepthHistoryItem[];
}

interface DepthHistoryMeta {
  startTime: string;
  endTime: string;
  priceShiftLoss: string;
  luviIncrease: string;
  startAssetDepth: string;
  startRuneDepth: string;
  startLPUnits: string;
  startMemberCount: string;
  startSynthUnits: string;
  endAssetDepth: string;
  endRuneDepth: string;
  endLPUnits: string;
  endMemberCount: string;
  endSynthUnits: string;
}

interface DepthHistoryItem {
  startTime: string;
  endTime: string;
  assetDepth: string;
  runeDepth: string;
  assetPrice: string;
  assetPriceUSD: string;
  liquidityUnits: string;
  membersCount: string;
  synthUnits: string;
  synthSupply: string;
  units: string;
  luvi: string;
}

export interface SaversHistory {
  meta: SaversHistoryMeta;
  intervals: SaversHistoryItem[];
}

interface SaversHistoryMeta {
  startTime: string;
  endTime: string;
  startSaversDepth: string;
  startUnits: string;
  startSaversCount: string;
  endSaversDepth: string;
  endUnits: string;
  endSaversCount: string;
}

interface SaversHistoryItem {
  startTime: string;
  endTime: string;
  saversDepth: string;
  saversCount: string;
  saversUnits: string;
}

export interface RUNEPoolHistory {
  meta: RUNEPoolHistoryMeta;
  intervals: RUNEPoolHistoryItem[];
}

interface RUNEPoolHistoryMeta {
  startTime: string;
  endTime: string;
  startUnits: string;
  startCount: string;
  endUnits: string;
  endCount: string;
}

interface RUNEPoolHistoryItem {
  startTime: string;
  endTime: string;
  count: string;
  units: string;
}

export interface EarningsHistory {
  meta: EarningsHistoryItem;
  intervals: EarningsHistoryItem[];
}

interface EarningsHistoryItem {
  startTime: string;
  endTime: string;
  liquidityFees: string;
  blockRewards: string;
  earnings: string;
  bondingEarnings: string;
  liquidityEarnings: string;
  avgNodeCount: string;
  runePriceUSD: string;
  pools: EarningsHistoryItemPool[];
}

interface EarningsHistoryItemPool {
  pool: string;
  assetLiquidityFees: string;
  runeLiquidityFees: string;
  totalLiquidityFeesRune: string;
  saverEarning: string;
  rewards: string;
  earnings: string;
}

export interface SwapHistory {
  meta: SwapHistoryItem;
  intervals: SwapHistoryItem[];
}

interface SwapHistoryItem {
  startTime: string;
  endTime: string;
  toAssetCount: string;
  toRuneCount: string;
  toTradeCount: string;
  fromTradeCount: string;
  synthMintCount: string;
  synthRedeemCount: string;
  totalCount: string;
  toAssetVolume: string;
  toRuneVolume: string;
  toTradeVolume: string;
  fromTradeVolume: string;
  synthMintVolume: string;
  synthRedeemVolume: string;
  totalVolume: string;
  toAssetVolumeUSD: string;
  toRuneVolumeUSD: string;
  toTradeVolumeUSD: string;
  fromTradeVolumeUSD: string;
  synthMintVolumeUSD: string;
  synthRedeemVolumeUSD: string;
  totalVolumeUSD: string;
  toAssetFees: string;
  toRuneFees: string;
  toTradeFees: string;
  fromTradeFees: string;
  synthMintFees: string;
  synthRedeemFees: string;
  totalFees: string;
  toAssetAverageSlip: string;
  toRuneAverageSlip: string;
  synthMintAverageSlip: string;
  toTradeAverageSlip: string;
  fromTradeAverageSlip: string;
  synthRedeemAverageSlip: string;
  averageSlip: string;
  runePriceUSD: string;
}

export interface TVLHistory {
  meta: TVLHistoryItem;
  intervals: TVLHistoryItem[];
}

interface TVLHistoryItem {
  startTime: string;
  endTime: string;
  totalValuePooled: string;
  runePriceUSD: string;
  poolsDepth: DepthHistoryItemPool[];
  totalValueBonded?: string;
  totalValueLocked?: string;
}

interface DepthHistoryItemPool {
  pool: string;
  totalDepth: string;
}

export interface LiquidityHistory {
  meta: LiquidityHistoryItem;
  intervals: LiquidityHistoryItem[];
}

interface LiquidityHistoryItem {
  startTime: string;
  endTime: string;
  addAssetLiquidityVolume: string;
  addRuneLiquidityVolume: string;
  addLiquidityVolume: string;
  addLiquidityCount: string;
  withdrawAssetVolume: string;
  withdrawRuneVolume: string;
  withdrawVolume: string;
  withdrawCount: string;
  net: string;
  runePriceUSD: string;
}

export interface MidgardNode {
  nodeAddress: string;
  secp256k1: string;
  ed25519: string;
}

export interface MidgardNetwork {
  bondMetrics: BondMetrics;
  blockRewards: BlockRewards;
  activeBonds: string[];
  standbyBonds: string[];
  activeNodeCount: string;
  standbyNodeCount: string;
  totalPooledRune: string;
  totalReserve: string;
  nextChurnHeight: string;
  poolActivationCountdown: string;
  poolShareFactor: string;
  bondingAPY: string;
  liquidityAPY: string;
}

interface BondMetrics {
  totalActiveBond: string;
  averageActiveBond: string;
  medianActiveBond: string;
  minimumActiveBond: string;
  maximumActiveBond: string;
  totalStandbyBond: string;
  averageStandbyBond: string;
  medianStandbyBond: string;
  minimumStandbyBond: string;
  maximumStandbyBond: string;
  bondHardCap: string;
}

interface BlockRewards {
  blockReward: string;
  bondReward: string;
  poolReward: string;
}

export interface Action {
  pools: string[];
  type: string;
  status: string;
  in: Transaction[];
  out: Transaction[];
  date: string;
  height: string;
  metadata: Metadata;
}

interface Transaction {
  txID: string;
  address: string;
  coins: Coin[];
  height?: string;
}

interface Coin {
  asset: string;
  amount: string;
}

interface Metadata {
  swap?: SwapMetadata;
  addLiquidity?: AddLiquidityMetadata;
  withdraw?: WithdrawMetadata;
  refund?: RefundMetadata;
  send?: SendMetadata;
  thorname?: ThornameMetadata;
  runePoolDeposit?: RunePoolDepositMetadata;
  runePoolWithdraw?: RunePoolWithdrawMetadata;
}

interface SwapMetadata {
  streamingSwapMeta?: StreamingSwapMeta;
  networkFees: Coin[];
  liquidityFee: string;
  swapSlip: string;
  swapTarget: string;
  affiliateFee: string;
  affiliateAddress: string;
  memo: string;
  isStreamingSwap: boolean;
  txType: string;
}

interface AddLiquidityMetadata {
  liquidityUnits: string;
}

interface WithdrawMetadata {
  liquidityUnits: string;
  asymmetry: string;
  basisPoints: string;
  networkFees: Coin[];
  impermanentLossProtection: string;
  memo: string;
}

interface RefundMetadata {
  networkFees: Coin[];
  reason: string;
  memo: string;
  affiliateFee: string;
  affiliateAddress: string;
  txType: string;
}

interface SendMetadata {
  networkFees: Coin[];
  memo: string;
}

interface ThornameMetadata {
  memo: string;
  thorname: string;
  address: string;
  owner: string;
  expire: string;
  chain: string;
  fundAmount: string;
  registrationFee: string;
  txType: string;
}

interface RunePoolDepositMetadata {
  units: string;
}

interface RunePoolWithdrawMetadata {
  units: string;
  basisPoints: string;
  affiliateAmount: string;
  affiliateAddress: string;
  affiliateBasisPoint: string;
}

interface StreamingSwapMeta {
  count: string;
  quantity: string;
  interval: string;
  lastHeight: string;
  inCoin: Coin;
  outCoin: Coin;
  depositedCoin: Coin;
  failedSwaps?: string[];
  failedSwapReasons?: string[];
}

export interface MemberPool {
  pool: string;
  runeAddress: string;
  assetAddress: string;
  liquidityUnits: string;
  runeDeposit: string;
  assetDeposit: string;
  runeAdded: string;
  assetAdded: string;
  runePending: string;
  assetPending: string;
  runeWithdrawn: string;
  assetWithdrawn: string;
  dateFirstAdded: string;
  dateLastAdded: string;
}

export interface SaverPool {
  pool: string;
  assetAddress: string;
  saverUnits: string;
  assetAdded: string;
  assetRedeem: string;
  assetDeposit: string;
  assetWithdrawn: string;
  dateFirstAdded: string;
  dateLastAdded: string;
}

export interface THORNameDetails {
  owner: string;
  expire: string;
  entries: THORNameEntry[];
}

interface THORNameEntry {
  chain: string;
  address: string;
}

export interface StatsData {
  runeDepth: string;
  switchedRune: string;
  runePriceUSD: string;
  swapVolume: string;
  swapCount24h: string;
  swapCount30d: string;
  swapCount: string;
  toAssetCount: string;
  toRuneCount: string;
  synthMintCount: string;
  synthBurnCount: string;
  dailyActiveUsers: string;
  monthlyActiveUsers: string;
  uniqueSwapperCount: string;
  addLiquidityVolume: string;
  withdrawVolume: string;
  addLiquidityCount: string;
  withdrawCount: string;
}

export interface Balance {
  height: string;
  date: string;
  coins: Coin[];
}

export interface LastBlock {
  chain: string;
  last_observed_in: number;
  last_signed_out: number;
  thorchain: number;
}

// types.ts

export interface NetworkData {
  activeNodeCount: string;
  standbyNodeCount: string;
  totalPooledRune: string;
  totalReserve: string;
  bondMetrics: {
    totalActiveBond: string;
    averageActiveBond: string;
    medianActiveBond: string;
    minimumActiveBond: string;
    maximumActiveBond: string;
    totalStandbyBond: string;
    averageStandbyBond: string;
    medianStandbyBond: string;
    minimumStandbyBond: string;
    maximumStandbyBond: string;
  };
  blockRewards: {
    blockReward: string;
    bondReward: string;
    poolReward: string;
  };
  bondingAPY: string;
  liquidityAPY: string;
  nextChurnHeight: string;
  poolActivationCountdown: string;
  poolShareFactor: string;
  // Add any other fields that are part of your NetworkData
}

export interface Node {
  node_address: string;
  status: string;
  pub_key_set: {
    secp256k1: string;
    ed25519: string;
  };
  validator_cons_pub_key: string;
  bond: string;
  active_block_height: string;
  bond_address: string;
  status_since: string;
  signer_membership: string[];
  requested_to_leave: boolean;
  forced_to_leave: boolean;
  leave_height: string;
  ip_address: string;
  version: string;
  slash_points: string;
  jail: {
    node_address: string;
    release_height: string;
    reason: string;
  };
  current_award: string;
  observe_chains: string[];
  preflight_status: {
    status: string;
    reason: string;
    code: string;
  };
  bond_providers: {
    node_address: string;
    node_operator_fee: string;
    providers: {
      bond_address: string;
      rune_bond_amount: string;
      rune_asset_amount: string;
    }[];
  };
  total_bond: string;
  node_name?: string;
  // Add any other fields that are part of your Node object
}

export interface LastBlock {
  chain: string;
  last_observed_in: number;
  last_signed_out: number;
  thorchain: number;
}

// Add any other types you might need