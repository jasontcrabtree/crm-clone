import { render, act, screen } from '@testing-library/react';
import AuthProvider, { AuthContext } from '@/ui-system/components/auth-provider';
import React, { useContext } from 'react';

describe('AuthProvider', () => {
    it('updates context correctly when session changes', () => {
        const TestComponent = () => {
            const { session } = React.useContext(AuthContext);
            return <div>{`Session: ${session}`}</div>;
        };

        const { rerender } = render(
            <AuthProvider session={false}>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByText('Session: false')).toBeInTheDocument();

        // Rerender with a new session value
        rerender(
            <AuthProvider session={true}>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByText('Session: true')).toBeInTheDocument();
    });
});
