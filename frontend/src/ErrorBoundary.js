import { Component } from 'react';

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
    return { hasError: true };
}

    componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
}

    render() {
    if (this.state.hasError) {
    return (
        <div className="error-fallback">
            <h2>Something went wrong.</h2>
            <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
    );
    }
    return this.props.children;
}
}

export default ErrorBoundary;