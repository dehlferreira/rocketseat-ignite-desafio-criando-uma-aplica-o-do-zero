import { useEffect } from 'react';

import styles from './comments.module.scss';

export default function Comments() {
  useEffect(() => {
    const script = document.createElement('script');
    const anchor = document.getElementById('inject-comments-for-uterances');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute(
      'repo',
      'dehlferreira/rocketseat-ignite-space-traveling'
    );
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment :speech_balloon:');
    script.setAttribute('theme', 'dark-blue');
    anchor.appendChild(script);
  }, []);

  return (
    <div id="inject-comments-for-uterances" className={styles.container} />
  );
}
