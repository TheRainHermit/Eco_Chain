{/*<PrivyProvider 
  appId="your-privy-app-id"
  config={{
  "appearance": {
    "accentColor": "#6A6FF5",
    "theme": "#FFFFFF",
    "showWalletLoginFirst": false,
    "logo": "https://auth.privy.io/logos/privy-logo.png",
    "walletChainType": "ethereum-and-solana",
    "walletList": [
      "detected_wallets",
      "metamask",
      "phantom"
    ]
  },
  "loginMethods": [
    "wallet"
  ],
  "fundingMethodConfig": {
    "moonpay": {
      "useSandbox": true
    }
  },
  "embeddedWallets": {
    "requireUserPasswordOnCreate": false,
    "showWalletUIs": true,
    "ethereum": {
      "createOnLogin": "users-without-wallets"
    },
    "solana": {
      "createOnLogin": "users-without-wallets"
    }
  },
  "mfa": {
    "noPromptOnMfaRequired": false
  },
  "externalWallets": {
    "solana": {
      "connectors": {}
    }
  }
}}
>
  {children}
</PrivyProvider>*/}