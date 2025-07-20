import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
export const config = getDefaultConfig({
    appName: 'AI Agent DAO',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '', // get from cloud.walletconnect.com
    chains: [sepolia],
    ssr: true,
});
