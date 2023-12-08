const baseUrl = 'http://localhost:3001';

async function getLinkToken(authToken: string) {
  try {
    // console.log('authToken: ', authToken);
    console.log('getLinkToken --> START');
    const getToken = await fetch(baseUrl + '/api/create-link-token', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    });
    const linkToken = await getToken.json();
    return linkToken;
  } catch {
    console.log('Issue occurred on Link Token request ');
  }
}

async function exchangePublicToken(token: string, authToken: string) {
  try {
    const response = await fetch(baseUrl + '/api/exchange-public-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
      body: JSON.stringify({ token }),
    });
    const updatedUser = await response.json();
    console.log('updatedUser :>> ', updatedUser);
    return updatedUser;
  } catch {
    console.log('Issue occurred while sending Public Token to the server ');
  }
}

async function syncTransactions(authToken: string) {
  try {
    const response = await fetch(baseUrl + '/api/sync-transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    });
    const updatedUser = await response.json();
    console.log('updatedUser: ', updatedUser);
    return updatedUser;
  } catch {
    console.log('Issue occurred while syncing transactions ');
  }
}

export { getLinkToken, exchangePublicToken, syncTransactions };
