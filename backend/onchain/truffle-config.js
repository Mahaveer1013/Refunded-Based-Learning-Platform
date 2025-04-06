module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache default
      port: 7545,            // Ganache GUI default port
      network_id: "5777",       // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.8.20",     // Use a specific compiler version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
