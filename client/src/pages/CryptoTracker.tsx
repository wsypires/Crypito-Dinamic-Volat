import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Table,
  Text,
  Group,
  Avatar,
  Badge,
  Loader,
  Center,
  Paper,
  Grid,
  ThemeIcon,
} from "@mantine/core";
import { IconTrendingUp, IconTrendingDown, IconClock } from "@tabler/icons-react";
import { PageHeader } from "@/components";

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

export default function CryptoTracker() {
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

      const cryptosWithVolatility = data.map((crypto) => ({
        ...crypto,
        volatility: calculateVolatility(crypto.high_24h, crypto.low_24h),
      }));

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
    const interval = setInterval(fetchCryptoData, 10000);
    return () => clearInterval(interval);
  }, []);

  const rows = cryptos.map((crypto, index) => {
    const isPositive = crypto.price_change_percentage_24h >= 0;
    const volatilityColor = (crypto.volatility || 0) > 10 ? "red" : (crypto.volatility || 0) > 5 ? "yellow" : "green";

    return (
      <Table.Tr key={crypto.id}>
        <Table.Td fw={600}>{index + 1}</Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar src={crypto.image} size={32} radius="md" />
            <div>
              <Text fw={500} size="sm">
                {crypto.name}
              </Text>
              <Text size="xs" c="dimmed">
                {crypto.symbol.toUpperCase()}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td ta="right" fw={600}>
          ${crypto.current_price?.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Table.Td>
        <Table.Td ta="right">
          <Group gap={4} justify="flex-end">
            <ThemeIcon
              size="sm"
              variant="light"
              color={isPositive ? "green" : "red"}
            >
              {isPositive ? (
                <IconTrendingUp size={14} />
              ) : (
                <IconTrendingDown size={14} />
              )}
            </ThemeIcon>
            <Text
              fw={600}
              c={isPositive ? "green" : "red"}
              size="sm"
            >
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </Text>
          </Group>
        </Table.Td>
        <Table.Td ta="right">
          <Badge color={volatilityColor} variant="light" size="lg">
            {(crypto.volatility || 0).toFixed(2)}%
          </Badge>
        </Table.Td>
        <Table.Td ta="right">
          <div>
            <Text size="xs" c="dimmed">
              Max: ${crypto.high_24h?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            <Text size="xs" c="dimmed">
              Min: ${crypto.low_24h?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </div>
        </Table.Td>
      </Table.Tr>
    );
  });

  const avgVolatility = cryptos.length > 0
    ? (cryptos.reduce((sum, c) => sum + (c.volatility || 0), 0) / cryptos.length).toFixed(2)
    : "0.00";

  const maxVolatility = cryptos.length > 0
    ? Math.max(...cryptos.map((c) => c.volatility || 0)).toFixed(2)
    : "0.00";

  return (
    <Container fluid>
      <Stack gap="lg">
        <PageHeader title="Crypto Volatility Tracker" withActions={false} />

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="md" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <div>
                  <Text size="sm" c="dimmed">
                    Total de Ativos
                  </Text>
                  <Text fw={700} size="xl">
                    {cryptos.length}
                  </Text>
                </div>
                <ThemeIcon size="lg" variant="light" color="blue">
                  <IconClock size={20} />
                </ThemeIcon>
              </Group>
              <Text size="xs" c="dimmed">
                Atualizado em {lastUpdate.toLocaleTimeString("pt-BR")}
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="md" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <div>
                  <Text size="sm" c="dimmed">
                    Volatilidade Média
                  </Text>
                  <Text fw={700} size="xl">
                    {avgVolatility}%
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="md" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <div>
                  <Text size="sm" c="dimmed">
                    Volatilidade Máxima
                  </Text>
                  <Text fw={700} size="xl">
                    {maxVolatility}%
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>

        <Paper p="md" radius="md" withBorder>
          {loading && cryptos.length === 0 ? (
            <Center h={300}>
              <Loader />
            </Center>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Rank</Table.Th>
                    <Table.Th>Ativo</Table.Th>
                    <Table.Th ta="right">Preço</Table.Th>
                    <Table.Th ta="right">Variação 24h</Table.Th>
                    <Table.Th ta="right">Volatilidade 24h</Table.Th>
                    <Table.Th ta="right">Máx/Mín 24h</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </div>
          )}
        </Paper>

        <Paper p="md" radius="md" withBorder bg="blue.0">
          <Group gap="sm">
            <IconClock size={20} />
            <Text size="sm" c="dimmed">
              Os dados são atualizados automaticamente a cada 10 segundos. Volatilidade é
              calculada como: (Máximo 24h - Mínimo 24h) / Mínimo 24h × 100
            </Text>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
}
