import Header from './header'
import Footer from './footer'
import Head from 'next/head'

export default function Layout({ home, _metaData, children }) {
  return (
    <div className="top-40 absolute min-w-full">
      <Header home={home} />
      <Head>
        <title>{_metaData.n_title}</title>
        <meta name="description" content={_metaData.n_description} />
        <meta name="HandheldFriendly" content={_metaData.n_HandheldFriendly} />
        <meta property="og:site_name" content={_metaData.p_og_site_name} />
        <meta property="og:description" content={_metaData.p_og_description} />
        <link rel="canonical" href={_metaData.n_canonical_url} />
      </Head>
      <div>
        <main>
          <div
            id="content"
            className="container p-6 max-w-screen-lg mt-16 mx-auto"
          >
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
