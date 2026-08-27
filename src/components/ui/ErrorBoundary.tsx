import React from 'react';

interface Props {
  children: React.ReactNode;
  /** Changing this resets the boundary — used to recover after editing config. */
  resetKey?: unknown;
  label?: string;
}

interface State {
  error: Error | null;
}

/**
 * Catches render errors from embedded third-party components so a bad config
 * in the playground surfaces as a message instead of blanking the page.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/8 p-5 text-sm text-red-600 dark:text-red-400"
        >
          <p className="font-medium">{this.props.label ?? 'Something failed to render'}</p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-xs opacity-80">
            {error.message}
          </pre>
          <p className="mt-3 text-xs opacity-70">
            Edit the configuration above to recover, or reset the example.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
