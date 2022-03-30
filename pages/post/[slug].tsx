import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typings';
import { GetStaticProps } from 'next';
import PortableText from 'react-portable-text';

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  return (
    <main>
      <Header />

      <img
        className="h-40 w-full object-cover"
        src={urlFor(post.mainImage).url()}
        alt=""
      />

      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()}
            alt="author"
          />
          <p className="text-sm font-extralight">
            Blog post by{' '}
            <span className="text-[#fcbc2d]">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => <h1 className="my-5 text-2xl font-bold" />,
              h2: (props: any) => <h1 className="my-5 text-2xl font-bold" />,
              normal: (props: any) => <p className="my-2">{props.children}</p>,
              li: ({ children }: any) => (
                <link className="ml-4 list-disc">{children}</link>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-[#fcbc2d] hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>

      <hr className="mx-auto my-5 max-w-lg border-2 border-[#fcbc2d]" />

      <form className="mx-auto mb-10 flex max-w-2xl flex-col p-5">
        <h3 className="text-base font-bold text-[#fcbc2d]">
          Do you like this article?
        </h3>
        <h4 className="text-3xl font-bold">Leave a comment down below!</h4>
        <hr className="mt-2 py-3" />
        <label className="mb-5 block">
          <span className="text-gray-700">Name</span>
          <input
            className="mt-2 block w-full rounded-lg border py-2 px-3 shadow outline-none ring-[#fcbc2d] focus:ring"
            placeholder="Jonathan Johnson"
            type="text"
          />
        </label>
        <label className="mb-5 block">
          <span className="text-gray-700">Email</span>
          <input
            className="mt-2 block w-full rounded-lg border py-2 px-3 shadow outline-none ring-[#fcbc2d] focus:ring"
            placeholder="xxx@gmail.com"
            type="text"
          />
        </label>
        <label className="mb-5 block">
          <span className="text-gray-700">Comment</span>
          <textarea
            className="form-textarea mt-2 block w-full rounded-lg border py-2 px-3 shadow outline-none ring-[#fcbc2d] focus:ring"
            placeholder="Let us know yours thought"
            rows={8}
          />
        </label>
      </form>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
            current
        }
    }`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        slug,
        author -> {
        name,
        image
      },
      'comments': *[
        _type == 'connect' &&
        post._ref == ^._id &&
        approved == true
      ],
        description,
        mainImage,
        body
      }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
