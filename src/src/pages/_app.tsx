import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Footer from '@/components/Footer/footer';
import Gnb from '@/components/Gnb/Gnb';
import ModalsWrapper from '@/components/Modal/ModalsWrapper';
import PopupsWrapper from '@/components/Popup/PopupsWrapper';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ModalsWrapper />
      <PopupsWrapper />
      <Gnb />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}
