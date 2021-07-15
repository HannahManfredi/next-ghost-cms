import { getPosts, getSinglePost } from '../../api/ghost_data'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function PostPage({ post }) {
    let _title = post.meta_title + ' - Rabbit Rabbit: Emotional Software Engineering'
    let twitter_handle = '@hannahmanfredi'
    let metaObject = {
      n_title: _title,
      n_description: post.meta_description,
      n_HandheldFriendly: 'True',
      n_canonical_url: post.canonical_url,
      p_og_site_name: 'Rabbit Rabbit: Emotional Software Engineering',
      p_og_type: 'website',
      p_og_description: post.meta_description,
      p_og_image: post.feature_image,
      p_article_published_time: ''
    }
  return (
    <Layout _metaData={metaObject}>
      <div className="blogInnerHTML">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <Link href="/Home" as={'/'}>
        <a>-- go to homepage --</a>
      </Link>
    </Layout>
  )
}

export async function getStaticPaths() {
  const posts = await getPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const post = await getSinglePost(params.slug)
  return { props: { post: post } }
}
