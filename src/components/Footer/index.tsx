import Link from 'next/link';

import Comments from '../Comments';

import styles from './footer.module.scss';

interface FooterProps {
  isFirstPost: boolean;
  isLastPost: boolean;
}

export default function Footer({ isFirstPost, isLastPost }: FooterProps) {
  return (
    <>
      <footer className={styles.navigationPosts}>
        {isFirstPost ? (
          <div />
        ) : (
          <div>
            <Link href="/">
              <a>
                <p>Criando um app CRA do zero</p>
                <strong>Post anterior</strong>
              </a>
            </Link>
          </div>
        )}
        {isLastPost ? (
          <div />
        ) : (
          <div>
            <Link href="/">
              <a>
                <p>Criando um app CRA do zero</p>
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
