import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';

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

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
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

  return {
    props: {
      post,
    },
    revalidate: 1800,
  };
};
