const Header = () => {
    return (
        <header className="bg-white border-b-2 border-red-500 sticky top-0 bg-opacity-95 z-20">
            <nav className="flex justify-between items-center p-4 md:px-8 md:py-4">
                <div className="flex items-center">
                    <a href="/" className="text-2xl font-bold text-red-500">
                        BetKit
                    </a>
                </div>
                <div className="flex items-center">
                    <a
                        href="/login"
                        className="text-lg text-gray-600 hover:text-red-500"
                    >
                        Login
                    </a>
                    <a
                        href="/register"
                        className="text-lg text-gray-600 hover:text-red-500 ml-4"
                    >
                        Register
                    </a>
                </div>
            </nav>
        </header>
    );
};

export { Header };
