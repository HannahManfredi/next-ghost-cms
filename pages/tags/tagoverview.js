import { getTags, getSingleTag, getPostsByTag } from '../../api/ghost_data'
import Layout from '../../components/layout'
import Link from 'next/link'

export default function TagOverview({ tagObjects }) {
    let _title = tagObjects.meta_title + ' - Rabbit Rabbit: Emotional Software Engineering'
    let description = 'Overview of all tags used by my blog articles'
    let twitter_handle = '@hannahmanfredi'
    let metaObject = {
        n_title: _title,
        n_description: description,
        n_HandheldFriendly: 'True',
        p_og_site_name: 'Rabbit Rabbit: Emotional Software Engineering',
        p_og_type: 'website',
        p_og_description: description,
        p_article_published_time: '',
        n_twitter_title: _title,
        n_twitter_description: description,
        n_twitter_label1: 'Written by',
        n_twitter_data1: 'Hannah Manfredi',
        n_twitter_label2: 'Filed under',
        n_twitter_site: twitter_handle,
        n_twitter_creator: twitter_handle
    }
  return (
    <Layout _metaData={metaObject}>
      <div className="my-10">
        <h2 className="py-1 mx-2 my-8 text-indigo-900 text-2xl font-bold">
          Tag Overview
        </h2>
        {tagObjects.map((tag) => (
          <div className="mb-10">
            <h2 className="py-1 mx-2 my-8 text-indigo-900 text-xl">
              {tag.posts.length} post{tag.posts.length > 1 ? 's' : ''} tagged
              with <span className="font-bold">{tag.tag.name}</span>
            </h2>
            <ul>
              {tag.posts.map((post) => (
                <li className="cursor-pointer py-4 bg-gray-100 hover:bg-gray-200 m-2 rounded-md border-gray-200 border-2">
                  <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
                    <div className="mx-10">
                      <h3 className="font-medium text-indigo-900">
                        {post.title}
                      </h3>
                      {/* TODO refactor START */}
                      <p className="text-gray-600 text-xs">
                        {new Intl.DateTimeFormat('default', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }).format(new Date(post.published_at))}
                      </p>
                      {/* TODO refactor END */}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  let tagObjects = []

  for (const _tag of await getTags()) {
    let _posts = (await getPostsByTag(_tag.slug)).sort((a, b) => {
      return a.published_at > b.published_at ? -1 : 1
      return 0
    })

    tagObjects.push({
      tag: _tag,
      posts: _posts,
    })
  }

  return {
    props: { tagObjects },
  }
}