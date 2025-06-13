async function fetchSignals() {
  const signals = [
    {
      pair: "BTC/USDT",
      entry: 64000.12,
      target: 67200.13,
      stop: 62720.11,
      time: new Date().toLocaleTimeString(),
      strength: "Strong",
      status: "✅ Signal abhi bhi valid hai"
    },
    {
      pair: "ETH/USDT",
      entry: 3400.45,
      target: 3570.47,
      stop: 3332.44,
      time: new Date().toLocaleTimeString(),
      strength: "Medium",
      status: "✅ Signal abhi bhi valid hai"
    }
  ];

  const container = document.getElementById("signals");
  container.innerHTML = signals.map(signal => `
    <div>
      <p>🚨 Yeh coin pump ho raha hai: <strong>${signal.pair}</strong></p>
      <p>📥 Entry: $${signal.entry.toFixed(5)}</p>
      <p>🎯 Target: $${signal.target.toFixed(5)} (+5%)</p>
      <p>🛑 Stop Loss: $${signal.stop.toFixed(5)} (-2%)</p>
      <p>🕒 Time: ${signal.time}</p>
      <p>💪 Signal Strength: ${signal.strength}</p>
      <p>${signal.status}</p>
      <hr/>
    </div>
  `).join("");
}

function refreshSignals() {
  fetchSignals();
}

fetchSignals();