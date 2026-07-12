import fetch from 'node-fetch';

const doLogin = async () => {
  try {
    const res = await fetch('http://localhost:5005/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@assetflow.test', password: 'AdminPass123!' })
    });
    const data = await res.json();
    console.log('status', res.status);
    console.log(data);
  } catch (err) {
    console.error('request failed', err.message || err);
  }
};

doLogin();
