const API_URL = "https://api.binance.com/api/v3/ticker/price";
const coins = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "DOGEUSDT"];

async function fetchPrice(symbol) {
  const res = await fetch(`${API_URL}?symbol=${symbol}`);
  const data = await res.json();
  return parseFloat(data.price);
}

function simulateSupportResistance(symbol) {
  // Fake support/resistance values just for demo
  const levels = {
    BTCUSDT: { support: 64000, resistance: 66000 },
    ETHUSDT: { support: 3300, resistance: 3500 },
    SOLUSDT: { support: 140, resistance: 160 },
    BNBUSDT: { support: 570, resistance: 600 },
    DOGEUSDT: { support: 0.12, resistance: 0.145 },
  };
  return levels[symbol];
}

function checkConditions(price, support, resistance) {
  // Price must be close to support (within 1.5%) and in uptrend
  const nearSupport = price <= support * 1.015;
  const belowResistance = price < resistance;

  // Simulate fake RSI + MACD buy confirmation
  const rsiBuy = Math.random() > 0.3;
  const macdBuy = Math.random() > 0.4;

  return nearSupport && belowResistance && rsiBuy && macdBuy;
}

function getSignalStrength() {
  const rand = Math.random();
  if (rand > 0.8) return "Strong";
  if (rand > 0.5) return "Medium";
  return "Weak";
}

async function fetchSignals() {
  const container = document.getElementById("signals");
  container.innerHTML = "⏳ Loading signals...";

  const signals = [];

  for (const coin of coins) {
    const price = await fetchPrice(coin);
    const { support, resistance } = simulateSupportResistance(coin);

    const isValid = checkConditions(price, support, resistance);

    if (isValid) {
      const entry = price.toFixed(2);
      const target = (resistance * 0.995).toFixed(2); // just below resistance
      const stopLoss = (support * 0.985).toFixed(2); // just below support
      const strength = getSignalStrength();

      signals.push({
        coin,
        entry,
        target,
        stopLoss,
        strength,
        time: new Date().toLocaleTimeString(),
      });
    }
  }

  if (signals.length === 0) {
    container.innerHTML = "❌ Abhi koi signal nahi mila";
    return;
  }

  container.innerHTML = "";

  for (const s of signals) {
    const signalEl = document.createElement("div");
    signalEl.className = "signal";
    signalEl.innerHTML = `
      <strong>${s.coin}</strong><br/>
      🟢 Entry: ${s.entry} <br/>
      🎯 Target: ${s.target} <br/>
      🛑 Stop Loss: ${s.stopLoss} <br/>
      ⚡ Strength: <b>${s.strength}</b><br/>
      🕒 Time: ${s.time}
    `;
    container.appendChild(signalEl);
  }
}
