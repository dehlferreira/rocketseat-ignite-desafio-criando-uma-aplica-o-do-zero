import Link from 'next/link';
import { useMemo } from 'react';

import Comments from '../Comments';

import styles from './footer.module.scss';

interface FooterProps {
  isFirstPost: boolean;
  isLastPost: boolean;
  title: string;
}

export default function Footer({
  isFirstPost,
  isLastPost,
  title,
}: FooterProps) {
  const titleWithElipsize = useMemo(() => {
    const formattedText =
      title.length >= 26 ? `${title.substring(0, 26)}...` : title;

    return formattedText;
  }, []);

  return (
    <>
      <footer className={styles.navigationPosts}>
        {isFirstPost ? (
          <div />
        ) : (
          <div>
            <Link href="#">
              <a>
                <p>{titleWithElipsize}</p>
                <strong>Post anterior</strong>
              </a>
            </Link>
          </div>
        )}
        {isLastPost ? (
          <div />
        ) : (
          <div>
            <Link href="#">
              <a>
                <p>{titleWithElipsize}</p>
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
