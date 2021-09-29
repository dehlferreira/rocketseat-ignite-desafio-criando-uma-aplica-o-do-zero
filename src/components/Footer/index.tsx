import Link from 'next/link';
import { useMemo } from 'react';

import Comments from '../Comments';

import styles from './footer.module.scss';

type Post = {
  uid: string;
  data: {
    title: string;
  };
};

interface FooterProps {
  isFirstPost: boolean;
  isLastPost: boolean;
  previousPost: Post;
  nextPost: Post;
}

export default function Footer({
  isFirstPost,
  isLastPost,
  previousPost,
  nextPost,
}: FooterProps) {
  const titlePreviousPostWithElipsize = useMemo(() => {
    const formattedText =
      previousPost?.data?.title?.length >= 26
        ? `${previousPost?.data?.title.substring(0, 26)}...`
        : previousPost?.data?.title;

    return formattedText;
  }, [previousPost]);

  const titleNextPostWithElipsize = useMemo(() => {
    const formattedText =
      nextPost?.data?.title?.length >= 26
        ? `${nextPost?.data?.title.substring(0, 26)}...`
        : nextPost?.data?.title;

    return formattedText;
  }, [nextPost]);

  return (
    <>
      <footer className={styles.navigationPosts}>
        {isFirstPost ? (
          <div />
        ) : (
          <div>
            <Link href={`/post/${previousPost.uid}`}>
              <a>
                <p>{titlePreviousPostWithElipsize}</p>
                <strong>Post anterior</strong>
              </a>
            </Link>
          </div>
        )}
        {isLastPost ? (
          <div />
        ) : (
          <div>
            <Link href={`/post/${nextPost.uid}`}>
              <a>
                <p>{titleNextPostWithElipsize}</p>
                <strong>Próximo post</strong>
              </a>
            </Link>
          </div>
        )}
      </footer>
      <Comments />
    </>
  );
}
