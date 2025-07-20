import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
export const config = getDefaultConfig({
    appName: 'AI Agent DAO',
    projectId: '5fe83f5d3e80847efd38f5f0d3b8580e', // get from cloud.walletconnect.com
    chains: [sepolia],
    ssr: true,
});
