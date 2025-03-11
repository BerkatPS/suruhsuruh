import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="id">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <meta name="theme-color" content="#1f212f" />
                <meta name="description" content="Jasa pengerjaan tugas akademik dan perbaikan elektronik dengan harga terjangkau dan kualitas terbaik" />
                <meta property="og:title" content="SolusiKita - Jasa Akademik & Elektronik" />
                <meta property="og:description" content="Jasa pengerjaan tugas akademik dan perbaikan elektronik dengan harga terjangkau dan kualitas terbaik" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://solusikita.com" />
                <meta property="og:image" content="/og-image.jpg" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}