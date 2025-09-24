
import React, { useState } from 'react';
import type { PortfolioData } from '../types';
import DownloadIcon from './icons/DownloadIcon';
import ClipboardIcon from './icons/ClipboardIcon';

declare const JSZip: any;

interface PortfolioPreviewProps {
  htmlContent: string | null;
  error: string | null;
  onReset: () => void;
  formData: PortfolioData;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ htmlContent, error, onReset, formData }) => {
  const [copied, setCopied] = useState(false);

  const handleDownloadZip = () => {
    if (!htmlContent) return;
    const zip = new JSZip();
    zip.file("index.html", htmlContent);
    zip.generateAsync({ type: "blob" }).then(function(content: any) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `${formData.basicInfo.name.replace(/\s+/g, '_')}_portfolio.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
  };

  const handleCopy = () => {
    if (!htmlContent) return;
    navigator.clipboard.writeText(htmlContent).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  if (error) {
    return (
        <div className="text-center p-8 bg-gray-800 rounded-lg">
            <h2 className="text-3xl font-bold text-red-400 mb-4">Generation Failed</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button onClick={onReset} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-colors">
                Try Again
            </button>
        </div>
    )
  }

  if (!htmlContent) {
     return (
        <div className="text-center p-8 bg-gray-800 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-300 mb-4">Generating...</h2>
            <p className="text-gray-400">Please wait while our AI is building your website.</p>
        </div>
     );
  }

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
        <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Your Portfolio is Ready!
            </h1>
            <p className="mt-2 text-lg text-gray-400">
                Preview your site below, copy the code, or download it as a zip file.
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold mb-4 text-white">Live Preview</h2>
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <iframe
                    srcDoc={htmlContent}
                    title="Portfolio Preview"
                    className="w-full h-[600px] border-none"
                    sandbox="allow-scripts"
                />
                </div>
            </div>
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold mb-4 text-white">Generated Code</h2>
                <div className="bg-gray-800 rounded-lg shadow-2xl h-[600px] flex flex-col">
                    <div className="flex-1 overflow-auto p-4 relative">
                        <button onClick={handleCopy} className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors">
                            {copied ? <span className="text-green-400 text-sm">Copied!</span> : <ClipboardIcon />}
                        </button>
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                            <code>{htmlContent}</code>
                        </pre>
                    </div>
                    <div className="p-4 border-t border-gray-700 flex flex-col sm:flex-row gap-4">
                        <button onClick={handleDownloadZip} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition-colors">
                            <DownloadIcon />
                            Download .zip
                        </button>
                         <button onClick={onReset} className="flex-1 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 transition-colors">
                            Start Over
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PortfolioPreview;
