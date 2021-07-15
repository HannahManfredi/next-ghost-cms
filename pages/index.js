import PostPreviewCard from '../components/postpreviewcard'
import { getPosts } from '../api/ghost_data'
import Layout from '../components/layout'

export default function Home({ posts }) {
  let twitter_handle = '@hannahmanfredi'
  let title = 'Rabbit Rabbit: Emotional Software Engineering'
  let description = 'A NICE DESCRIPTION FOR YOUR BLOG'
  let metaObject = {
    n_title: title,
    n_description: description,
    n_HandheldFriendly: 'True',
    n_canonical_url: 'https://rabbit-rabbit.ghost.io',
    p_og_site_name: 'Rabbit Rabbit: Emotional Software Engineering',
    p_og_description: description,
    n_generator: 'Hannah Manfredi next.js + Ghost CMS',
  }
  return (
    <Layout home _metaData={metaObject}>
      <ul>
        {posts.map((post) => (
          <li>
            <PostPreviewCard blogpost={post} />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()

  posts.map((post) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }

    post.dateFormatted = new Intl.DateTimeFormat('default', options).format(
      new Date(post.published_at),
    )
  })
  return {
    props: {
      posts,
    },
  }
}