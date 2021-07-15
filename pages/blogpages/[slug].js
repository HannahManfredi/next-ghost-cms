import { getPages, getSinglePage } from '../../api/ghost_data'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function PostPage({ page }) {
  let _title = page.meta_title + ' - Rabbit Rabbit: Emotional Software Engineering'
  let twitter_handle = '@hannahmanfredi'
  let metaObject = {
    n_title: _title,
    n_description: page.meta_description,
    n_HandheldFriendly: 'True',
    n_canonical_url: page.canonical_url,
    p_og_site_name: 'Rabbit Rabbit: Emotional Software Engineering',
    p_og_type: 'website',
    p_og_description: page.meta_description,
    p_og_image: page.feature_image,
    p_article_published_time: '',
    n_twitter_title: _title,
    n_twitter_description: page.meta_description,
    n_twitter_image: page.feature_image,
    n_twitter_label1: 'Written by',
    n_twitter_data1: 'Hannah Manfredi',
    n_twitter_label2: 'Filed under',
    n_twitter_site: twitter_handle,
    n_twitter_creator: twitter_handle
  }
  return (
    <Layout _metaData={metaObject}>
      <div className="blogInnerHTML">
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const pages = await getPages()
  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const page = await getSinglePage(params.slug)
  return { props: { page: page } }
}
