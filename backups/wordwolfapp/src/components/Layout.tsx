import type { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 safe-area-bottom">
            <div className="w-full max-w-md glass rounded-3xl overflow-hidden h-[85dvh] flex flex-col relative">
                {children}
            </div>
        </div>
    );
};
