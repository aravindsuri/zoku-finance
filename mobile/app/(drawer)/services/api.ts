const api = {
    get: async (url: string) => {
      // Mock response for /users/me
      if (url === '/users/me') {
        return {
          data: {
            accounts: [
              {
                id: '1',
                type: 'paypal',
                accountData: { name: 'PayPal', balance: 427.81 },
                lastUpdated: new Date().toISOString(),
              },
              {
                id: '2',
                type: 'deutschebank',
                accountData: { name: 'Main Checking', balance: 3245.67 },
                lastUpdated: new Date().toISOString(),
              },
              // Add more mock accounts as needed
            ],
          },
        };
      }
      // Default mock
      return { data: {} };
    },
  };
  
  export default api;