import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';

import Footer from '../../components/Footer';

import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface Navigation {
  previousPost: {
    uid: string;
    data: {
      title: string;
    };
  };
  nextPost: {
    uid: string;
    data: {
      title: string;
    };
  };
}

interface PostProps {
  post: Post;
  navigation: Navigation;
}

export default function Post({ post, navigation }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  const postContentFormattedInHtml = post.data.content.map(section => {
    const text = section.body.reduce((acc, cur) => {
      const concat = acc.concat(RichText.asHtml([cur]));
      return concat;
    }, '');

    return {
      heading: section.heading,
      body: text,
    };
  });

  const formattedDate = format(
    new Date(post.first_publication_date),
    'dd MMM yyyy',
    {
      locale: ptBR,
    }
  );

  const textLenght = postContentFormattedInHtml.reduce((acc, cur) => {
    const wordsHeading = cur?.heading ? cur?.heading?.split(' ') : ''; // TODO - mudar a condição do split para um regex
    const wordsBody = cur?.body ? cur?.body?.split(' ') : ''; // TODO - mudar a condição do split para um regex

    return acc + wordsHeading?.length + wordsBody?.length;
  }, 0);

  const readingDuration = Math.ceil(textLenght / 200);

  return (
    <>
      <Head>
        <title>SpaceTraveling | {`${post.data.title}`}</title>
      </Head>
      <header className={styles.banner}>
        <img src={post.data.banner.url} alt="logo" />
      </header>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.data.title}</h1>
          <div className={styles.postDetails}>
            <FiCalendar />
            <span>{formattedDate}</span>
            <FiUser />
            <span>{post.data.author}</span>
            <FiClock />
            <span>{readingDuration} min</span>
          </div>
          <div className={styles.postEditedIn}>
            <span>* editado em 19 Mar 2021, às 15:49</span>
          </div>
          <div className={styles.postContent}>
            {postContentFormattedInHtml.map(section => {
              return (
                <section key={section.heading}>
                  <strong>{section.heading}</strong>
                  <div dangerouslySetInnerHTML={{ __html: section.body }} />
                </section>
              );
            })}
          </div>
        </article>
      </main>
      <Footer
        isFirstPost={navigation.previousPost.uid === null}
        isLastPost={navigation.nextPost.uid === null}
        previousPost={navigation.previousPost}
        nextPost={navigation.nextPost}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts'),
  ]);

  const postsSlugs = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths: postsSlugs,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('posts', String(slug), {});

  const previousPostResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.last_publication_date desc]',
    }
  );

  const nextPostResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.last_publication_date]',
    }
  );

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  const previousPost = {
    uid: previousPostResponse?.results[0]?.uid || null,
    first_publication_date:
      previousPostResponse?.results[0]?.first_publication_date || null,
    data: {
      title: previousPostResponse?.results[0]?.data.title || null,
      subtitle: previousPostResponse?.results[0]?.data.subtitle || null,
      banner: {
        url: previousPostResponse?.results[0]?.data.banner.url || null,
      },
      author: previousPostResponse?.results[0]?.data.author || null,
      content: previousPostResponse?.results[0]?.data.content || null,
    },
  };

  const nextPost = {
    uid: nextPostResponse?.results[0]?.uid || null,
    first_publication_date:
      nextPostResponse?.results[0]?.first_publication_date || null,
    data: {
      title: nextPostResponse?.results[0]?.data.title || null,
      subtitle: nextPostResponse?.results[0]?.data.subtitle || null,
      banner: {
        url: nextPostResponse?.results[0]?.data.banner.url || null,
      },
      author: nextPostResponse?.results[0]?.data.author || null,
      content: nextPostResponse?.results[0]?.data.content || null,
    },
  };

  return {
    props: {
      post,
      navigation: {
        previousPost,
        nextPost,
      },
    },
    revalidate: 1800,
  };
};
