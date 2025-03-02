import { WalletError } from '@bbachain/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@bbachain/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@bbachain/wallet-adapter-react-ui'
import { ReactNode, useCallback, useMemo } from 'react'
import { useCluster } from '../cluster/cluster-data-access'

import('@bbachain/wallet-adapter-react-ui/styles.css')

export const WalletButton = WalletMultiButton

export function BBAChainProvider({ children }: { children: ReactNode }) {
  const { cluster } = useCluster()
  const endpoint = useMemo(() => cluster.endpoint, [cluster])
  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
