import { useEffect, useState } from "react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
  volatility?: number;
}

export default function Home() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const calculateVolatility = (high: number, low: number): number => {
    if (low === 0) return 0;
    return ((high - low) / low) * 100;
  };

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&price_change_percentage=24h"
      );
      const data: CryptoData[] = await response.json();

      // Calcular volatilidade para cada ativo
      const cryptosWithVolatility = data.map((crypto) => ({
        ...crypto,
        volatility: calculateVolatility(crypto.high_24h, crypto.low_24h),
      }));

      // Ordenar por volatilidade decrescente e pegar top 30
      const topVolatile = cryptosWithVolatility
        .sort((a, b) => (b.volatility || 0) - (a.volatility || 0))
        .slice(0, 30);

      setCryptos(topVolatile);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 10000); // Atualizar a cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full border-b border-border px-4 py-4 sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={APP_LOGO}
              className="h-10 w-10 rounded-lg border border-border bg-card object-cover"
              alt="Logo"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{APP_TITLE}</h1>
              <p className="text-xs text-muted-foreground">Top 30 Ativos por Volatilidade 24h</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Atualizado em:</p>
            <p className="text-sm font-semibold text-foreground">
              {lastUpdate.toLocaleTimeString("pt-BR")}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {loading && cryptos.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Carregando dados...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Rank</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Ativo</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Preço</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Variação 24h</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Volatilidade 24h</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Máx/Mín 24h</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptos.map((crypto, index) => (
                    <tr
                      key={crypto.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-4 font-semibold text-foreground">{index + 1}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={crypto.image}
                            alt={crypto.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <div>
                            <p className="font-semibold text-foreground">{crypto.name}</p>
                            <p className="text-xs text-muted-foreground uppercase">
                              {crypto.symbol}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-foreground">
                        ${crypto.current_price?.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div
                          className={`flex items-center justify-end gap-1 font-semibold ${
                            crypto.price_change_percentage_24h >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="font-bold text-primary">
                          {(crypto.volatility || 0).toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right text-sm text-muted-foreground">
                        <div>
                          ${crypto.high_24h?.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <div>
                          ${crypto.low_24h?.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-4 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center text-xs text-muted-foreground">
          <p>
            Dados fornecidos por CoinGecko • Atualizado automaticamente a cada 10 segundos
          </p>
        </div>
      </footer>
    </div>
  );
}
