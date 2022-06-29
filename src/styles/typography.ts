import { createGlobalStyle } from 'styled-components';

export const TypographyStyle = createGlobalStyle`
  :root {
    --font-family-serif: 'Lora', serif;
    --font-family-sans-serif: 'OpenSans', sans-serif;
  }

  .typo-h1,
  .typo-h2,
  .typo-h3,
  .typo-p-xl,
  .typo-p-lg,
  .typo-p-md,
  .typo-p-sm,
  .typo-p-xs {
    font-weight: 400;
    margin-bottom: 0;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .typo-h1,
  .typo-h2,
  .typo-h3 {
    font-family: var(--font-family-serif);
  }

  .typo-p-xl,
  .typo-p-lg,
  .typo-p-md,
  .typo-p-sm,
  .typo-p-xs {
    font-family: var(--font-family-sans-serif);
  }

  .typo-h1 {
    font-size: 32px;
    line-height: 48px;
  }

  .typo-h2 {
    font-size: 24px;
    line-height: 32px;
  }

  .typo-h3 {
    font-size: 20px;
    line-height: 32px;
  }

  .typo-p-xl {
    font-size: 20px;
    line-height: 28px;
  }

  .typo-p-lg {
    font-size: 16px;
    line-height: 24px;
  }

  .typo-p-md {
    font-size: 14px;
    line-height: 20px;
  }

  .typo-p-sm {
    font-size: 12px;
    line-height: 16px;
  }

  .typo-p-xs {
    font-size: 10px;
    line-height: 16px;
  }

  .font-light {
    font-weight: 300;
  }

  .font-bold {
    font-weight: 700;
  }
`;
