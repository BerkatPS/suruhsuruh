import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { siteConfig } from '@/config/site';

interface LayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
}

const Layout = ({
                    children,
                    title = siteConfig.name,
                    description = siteConfig.description,
                    keywords = 'jasa akademik, jasa elektronik, tugas kuliah, perbaikan gadget, jasa skripsi'
                }: LayoutProps) => {
    const pageTitle = `${title} | ${siteConfig.name}`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={siteConfig.url} />
                <meta property="og:image" content={siteConfig.ogImage} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;