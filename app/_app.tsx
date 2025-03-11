import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>suruhsuruh - Jasa Akademik & Elektronik</title>
                <meta name="description" content="Solusi untuk kebutuhan akademik dan perbaikan elektronik Anda" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#121212" />
            </Head>
            <div className={poppins.className}>
                <Component {...pageProps} />
            </div>
        </>
    );
}