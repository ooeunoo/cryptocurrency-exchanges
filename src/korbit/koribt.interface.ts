export interface KorbitTicker {
  [market: string]: {
    timestamp: number; //1559285555322;
    last: string; // "513000";
    open: string; //  "523900";
    bid: string; // "512100";
    ask: string; // "513350";
    low: string; // "476200";
    high: string; // "540900";
    volume: string; // "4477.20611753";
    change: string; // "-10900";
    changePercent: string; // "-2.08";
  };
}
