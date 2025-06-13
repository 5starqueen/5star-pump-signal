const signalsDiv = document.getElementById('signals');

function generateFakeSignal() {
  const coins = ['BTC/USDT', 'ETH/USDT', 'BIFI/USDT', 'EPIC/USDT', 'HEI/USDT', 'IOTX/USDT'];
  const coin = coins[Math.floor(Math.random() * coins.length)];
  const entry = (Math.random() * 100).toFixed(2);
  const priceChange = (Math.random() * 10).toFixed(2);
  const target = (entry * 1.05).toFixed(2);
  const stopLoss = (entry * 0.98).toFixed(2);

  let strength = 'Weak';
  if (priceChange > 4 && priceChange <= 7) strength = 'Medium';
  else if (priceChange > 7) strength = 'Strong';

  return {
    coin,
    entry,
    target,
    stopLoss,
    priceChange,
    strength,
    time: new Date().toLocaleTimeString()
  };
}

function showSignal(signal) {
  const div = document.createElement('div');
  div.className = 'signal';
  div.innerHTML = `
    <strong>🚨 Yeh coin pump ho raha hai:</strong> ${signal.coin}<br/>
    💼 Entry: $${signal.entry}<br/>
    🎯 Target: $${signal.target} (+5%)<br/>
    🛑 Stop Loss: $${signal.stopLoss} (-2%)<br/>
    📊 Price Change: ${signal.priceChange}%<br/>
    🔥 Strength: ${signal.strength}<br/>
    🕒 Time: ${signal.time}
  `;
  signalsDiv.prepend(div);

  // Auto hide if target hit
  if (parseFloat(signal.priceChange) >= 5) {
    setTimeout(() => {
      div.remove();
    }, 10000); // hide after 10 seconds
  }
}

// Show a new fake signal every 15 seconds
setInterval(() => {
  const signal = generateFakeSignal();
  showSignal(signal);
}, 15000);

// Initial signal
showSignal(generateFakeSignal());
