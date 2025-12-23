const fetchFn = global.fetch || require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, model, temperature, max_tokens } = req.body || {};
    const apiKey = process.env.T20_API_KEY;
    const endpoint = process.env.T20_ENDPOINT || 'https://api.wrmgpt.com/v1/chat/completions';

    if (!apiKey) {
      return res.status(500).json({ error: 'Server API key not configured. Set T20_API_KEY in env' });
    }

    const payload = {
      model: model || 'wormgpt-v7',
      messages: [{ role: 'user', content: message }],
      temperature: typeof temperature === 'number' ? temperature : 0.7,
      max_tokens: typeof max_tokens === 'number' ? max_tokens : 1000
    };

    const response = await fetchFn(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return res.json({ reply: data.choices[0].message.content });
    }

    return res.status(502).json({ error: 'Invalid response from upstream API' });

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: err.message });
  }
};
