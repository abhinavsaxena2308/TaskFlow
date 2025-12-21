import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
                    {children}
                </main>
            </div>
        </div>
    );
}