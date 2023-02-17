import { createGlobalStyle } from 'styled-components';

export const TextStyle = createGlobalStyle`
  :root {
    --font-family-serif: 'Lora', serif;
    --font-family-sans-serif: 'OpenSans', sans-serif;
  }

  .text-h1,
  .text-h2,
  .text-h3,
  .text-xl,
  .text-lg,
  .text-md,
  .text-sm,
  .text-xs {
    font-weight: 400;
    margin-bottom: 0;
  }

  .text-h1,
  .text-h2,
  .text-h3 {
    font-family: var(--font-family-serif);
  }

  .text-xl,
  .text-lg,
  .text-md,
  .text-sm,
  .text-xs {
    font-family: var(--font-family-sans-serif);
  }

  .text-h1 {
    font-size: 32px;
    line-height: 48px;
  }

  .text-h2 {
    font-size: 24px;
    line-height: 32px;
  }

  .text-h3 {
    font-size: 20px;
    line-height: 32px;
  }

  .text-xl {
    font-size: 20px;
    line-height: 28px;
  }

  .text-lg {
    font-size: 16px;
    line-height: 24px;
  }

  .text-md {
    font-size: 14px;
    line-height: 20px;
  }

  .text-sm {
    font-size: 12px;
    line-height: 18px;
  }

  .text-xs {
    font-size: 10px;
    line-height: 16px;
  }

  .font-light {
    font-weight: 300;
  }

  .font-regular {
    font-weight: 400;
  }

  .font-semibold {
    font-weight: 600;
  }

  .font-bold {
    font-weight: 700;
  }

  .color-primary {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .color-secondary {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .color-success {
    color: ${({ theme }) => theme.colors.successMain};
  }

  .color-error {
    color: ${({ theme }) => theme.colors.errorMain};
  }

  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .break-word {
    word-break: break-word;
  }
`;
