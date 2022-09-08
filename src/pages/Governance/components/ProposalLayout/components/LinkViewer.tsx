import { Icon } from '@q-dev/q-ui-kit';

interface Props {
  link: string;
}

function LinkViewer ({ link }: Props) {
  return link
    ? (
      <a
        className="link text-md"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        <span className="ellipsis">{link}</span>
        <Icon name="external-link" />
      </a>
    )
    : (
      <p className="text-md">–</p>
    );
}

export default LinkViewer;
