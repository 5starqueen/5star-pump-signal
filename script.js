
async function fetchSignals() {
    document.getElementById("signals-container").innerHTML = "⏳ Real-time signals la rahe hain...";

    try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
        const data = await res.json();

        const usdtPairs = data.filter(pair => 
            pair.symbol.endsWith("USDT") && !pair.symbol.includes("UP") && !pair.symbol.includes("DOWN")
        );

        const signals = usdtPairs
            .map(pair => {
                const symbol = pair.symbol;
                const lastPrice = parseFloat(pair.lastPrice);
                const priceChangePercent = parseFloat(pair.priceChangePercent);

                if (priceChangePercent >= 3) {
                    return {
                        pair: symbol.replace("USDT", "/USDT"),
                        entry: lastPrice.toFixed(2),
                        target: (lastPrice * 1.05).toFixed(2),
                        stopLoss: (lastPrice * 0.98).toFixed(2),
                        change: priceChangePercent.toFixed(2)
                    };
                }
                return null;
            })
            .filter(Boolean)
            .slice(0, 10);

        if (signals.length === 0) {
            document.getElementById("signals-container").innerHTML = "😕 Abhi koi strong pump signal nahi mila.";
            return;
        }

        let html = "";
        signals.forEach(signal => {
            html += `<div style="margin-bottom: 20px; border-bottom: 1px solid #444; padding-bottom: 10px;">
                <strong>🚨 Yeh coin pump ho raha hai: ${signal.pair}</strong><br>
                📥 Entry: $${signal.entry}<br>
                🎯 Target: $${signal.target} (+5%)<br>
                🛑 Stop Loss: $${signal.stopLoss} (-2%)<br>
                📊 Price Change: ${signal.change}%
            </div>`;
        });

        document.getElementById("signals-container").innerHTML = html;

    } catch (err) {
        document.getElementById("signals-container").innerHTML = "❌ Signal laane mein error aa gaya.";
        console.error(err);
    }
}

fetchSignals();
