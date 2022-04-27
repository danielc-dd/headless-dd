import { getNextStaticProps, is404 } from '@faustjs/next';
import { client } from 'client';
import {
  ContentWrapper,
  Footer,
  Header,
  EntryHeader,
  Main,
  SEO,
  TaxonomyTerms,
} from 'components';
import { pageTitle } from 'utils';

export function PostComponent({ post }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  console.log(post.test);
  return (
    <>
      <SEO
        title={pageTitle(
          generalSettings,
          post?.title(),
          generalSettings?.title
        )}
        imageUrl={post?.featuredImage?.node?.sourceUrl?.()}
      />

      <Header />

      <Main>
        <EntryHeader
          title={post?.title()}
          date={post?.date}
          author={post?.author?.node?.name}
          image={post?.featuredImage?.node}
        />
        <div className="container">
          <ContentWrapper content={post?.content()}>
            <TaxonomyTerms post={post} taxonomy={'categories'} />
            <TaxonomyTerms post={post} taxonomy={'tags'} />
          </ContentWrapper>

          {post?.test?.testfield && (
            <div className="testfield">{post.test.testfield}</div>
          ) }

        {post?.test?.testrepeater?.map((repeater, i) => (
          <div className="cols-container" key={i}>
            {/* <div className="col-container-left">
              {repeater.repeaterTitle}
            </div>
            <div className="col-container-left">
              {repeater.repeaterText}
            </div> */}
            <div className="col-container col-container-left" dangerouslySetInnerHTML={{ __html: repeater.repeaterTitle }} />
            <div className="col-container col-container-right" dangerouslySetInnerHTML={{ __html: repeater.repeaterText }} />
          </div>
        ))}

        </div>
      </Main>

      <Footer />
    </>
  );
}

export default function Page() {
  const { usePost } = client;
  const post = usePost();

  return <PostComponent post={post} />;
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
