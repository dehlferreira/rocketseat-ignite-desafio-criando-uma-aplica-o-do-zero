import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

interface Post {
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  const loadMorePosts = () => {
    if (!nextPage) {
      return;
    }

    fetch(nextPage)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newPosts = data.results.map(d => {
          return {
            slug: d.uid,
            first_publication_date: d.first_publication_date,
            data: {
              title: d.data.title,
              subtitle: d.data.subtitle,
              author: d.data.author,
            },
          };
        });

        setPosts([...posts, ...newPosts]);

        setNextPage(data.next_page);
      });
  };

  const formattedDate = date => {
    return format(new Date(date), 'dd MMM yyyy', {
      locale: ptBR,
    });
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div>
                  <FiCalendar />
                  <time>{formattedDate(post.first_publication_date)}</time>
                  <FiUser />
                  <span>{post.data.author}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {nextPage && (
          <button type="button" onClick={loadMorePosts}>
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 5,
    }
  );

  const nextPage = postsResponse.next_page;

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: nextPage,
        results: posts,
      },
    },
  };
};
