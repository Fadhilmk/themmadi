import { useEffect, useState } from 'react';

export default function TutorialModal({ onClose }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if the tutorial has been shown before using localStorage
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
        if (!hasSeenTutorial) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenTutorial', 'true'); // Set flag to localStorage
        onClose && onClose();
    };

    if (!isOpen) return null; // Do not render the modal if it's not open

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg relative w-full max-w-lg lg:max-w-2xl lg:p-8 mx-4">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &#10006;
                </button>

                {/* Title */}
                <h2 className="text-xl lg:text-2xl font-bold mb-4" style={{ fontFamily: 'LeagueSpartan' }}>
                    Welcome to MaaDiy!
                </h2>

                {/* Description */}
                <p className="mb-4" style={{ fontFamily: 'LeagueSpartan' }}>
                    Watch this short tutorial to get started:
                </p>

                {/* Video Container */}
                <div className="relative" style={{ paddingTop: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/EngW7tLk6R8?si=vvHQaB9ip5bwVsS_"
                        title="YouTube Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Got It Button */}
                <button
                    onClick={handleClose}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
                    style={{ fontFamily: 'LeagueSpartan' }}
                >
                    Got it!
                </button>
            </div>
        </div>
    );
}
