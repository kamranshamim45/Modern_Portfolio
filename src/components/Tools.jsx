import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import imageCompression from 'browser-image-compression';
import jsPDF from 'jspdf';
import { useTheme } from '../App';

const Tools = () => {
  const [activeTool, setActiveTool] = useState('qr');
  const { darkMode } = useTheme();

  // QR Code states
  const [inputType, setInputType] = useState('text');
  const [inputValue, setInputValue] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  // Image Resizer states
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [resizedFile, setResizedFile] = useState(null);
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);
  const [resizeQuality, setResizeQuality] = useState(0.8);
  const [resizing, setResizing] = useState(false);

  // PDF Converter states
  const [pdfFiles, setPdfFiles] = useState([]);
  const [converting, setConverting] = useState(false);

  // Generate sample QR code on component mount
  useEffect(() => {
    const generateSampleQR = async () => {
      try {
        const sampleText = 'Welcome to Developer Tools!';
        const qrDataUrl = await QRCode.toDataURL(sampleText, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(qrDataUrl);
      } catch (err) {
        console.error('Failed to generate sample QR code:', err);
      }
    };

    generateSampleQR();
  }, []);

  const handleGenerateQR = async () => {
    if (!inputValue.trim()) {
      setError('Please enter some content to generate QR code');
      return;
    }

    try {
      let qrContent = inputValue;

      if (inputType === 'image') {
        // For images, we'll encode the image data as base64 in the QR code
        // This works for small images, but larger ones may fail
        qrContent = inputValue; // Already base64 from file upload
      }

      const qrDataUrl = await QRCode.toDataURL(qrContent, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'L' // Low error correction for maximum data capacity
      });
      setQrCodeUrl(qrDataUrl);
      setError('');
    } catch (err) {
      setError('Failed to generate QR code. The content may be too large. Try a smaller image or use text/URL instead.');
      console.error('QR Code generation error:', err);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 10MB to allow larger images)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size too large. Please select an image smaller than 10MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setInputValue(base64String);
        setInputType('image');
        setUploadedImageUrl(base64String); // Store for display
        setError(''); // Clear any previous errors
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Image Resizer functions
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target.result);
        setResizedImage(null);
        setResizedFile(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = async () => {
    if (!originalImage) return;

    setResizing(true);
    try {
      // Convert data URL to File object
      const response = await fetch(originalImage);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: blob.type });

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: Math.max(resizeWidth, resizeHeight),
        useWebWorker: true,
        quality: resizeQuality,
      };

      const compressedFile = await imageCompression(file, options);
      const compressedDataUrl = await imageCompression.getDataUrlFromFile(compressedFile);
      setResizedImage(compressedDataUrl);
      setResizedFile(compressedFile);
    } catch (error) {
      console.error('Error resizing image:', error);
    }
    setResizing(false);
  };

  const downloadResizedImage = () => {
    if (resizedImage) {
      const link = document.createElement('a');
      link.href = resizedImage;
      link.download = 'resized-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // PDF Converter functions
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setPdfFiles(files);
  };

  const convertToPDF = async () => {
    if (pdfFiles.length === 0) return;

    setConverting(true);
    const pdf = new jsPDF();

    for (let i = 0; i < pdfFiles.length; i++) {
      const file = pdfFiles[i];

      if (file.type.startsWith('image/')) {
        // Handle image files
        const imgData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, 10, 190, 0);
      } else if (file.type === 'text/plain') {
        // Handle text files
        const text = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsText(file);
        });

        if (i > 0) pdf.addPage();
        pdf.text(text, 10, 10);
      }
    }

    pdf.save('converted-document.pdf');
    setConverting(false);
  };

  return (
    <section id="tools" className={`py-20 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Developer Tools
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Tool Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveTool('qr')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTool === 'qr'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                QR Code Generator
              </button>
              <button
                onClick={() => setActiveTool('resize')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTool === 'resize'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                Image Resizer
              </button>
              <button
                onClick={() => setActiveTool('pdf')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTool === 'pdf'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                Document to PDF
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 shadow-xl transition-colors duration-300 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}
          >
            {activeTool === 'qr' && (
              <>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
                  QR Code Generator
                </h3>

            <div className="space-y-6">
              {/* Input Type Selection */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-gray-300 mb-2">
                  Input Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="text"
                      checked={inputType === 'text'}
                      onChange={(e) => setInputType(e.target.value)}
                      className="mr-2"
                    />
                    Text/URL
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="image"
                      checked={inputType === 'image'}
                      onChange={(e) => setInputType(e.target.value)}
                      className="mr-2"
                    />
                    Image Upload
                  </label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Note: Large images may not fit in QR codes. Use small images (under 2KB when encoded) for best results.
                </p>
              </div>

              {/* Input Field */}
              {inputType === 'text' ? (
                <div>
                  <label className="block text-sm font-medium text-black dark:text-gray-300 mb-2">
                    Enter Text or URL
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter text or URL here..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-black dark:text-gray-300 mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    key={inputType} // Force re-render to avoid controlled/uncontrolled warning
                  />
                  {uploadedImageUrl && (
                    <div className="mt-4">
                      <p className="text-sm text-black dark:text-gray-400 mb-2">Preview:</p>
                      <img
                        src={uploadedImageUrl}
                        alt="Uploaded preview"
                        className="max-w-full h-32 object-contain border border-gray-300 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerateQR}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Generate QR Code
              </button>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-center font-medium">
                  {error}
                </div>
              )}

              {/* QR Code Display */}
              {qrCodeUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-4"
                >
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg inline-block">
                    <img
                      src={qrCodeUrl}
                      alt="Generated QR Code"
                      className="max-w-full h-auto"
                    />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                  >
                    Download QR Code
                  </button>
                </motion.div>
              )}
            </div>
              </>
            )}

            {activeTool === 'resize' && (
              <>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
                  Image Resizer
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-gray-300 mb-2">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  {originalImage && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
                          Original {originalFile && `(${(originalFile.size / 1024).toFixed(1)} KB)`}
                        </h4>
                        <img
                          src={originalImage}
                          alt="Original"
                          className="max-w-full h-auto border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                      {resizedImage && (
                        <div>
                          <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
                            Resized {resizedFile && `(${(resizedFile.size / 1024).toFixed(1)} KB)`}
                          </h4>
                          <img
                            src={resizedImage}
                            alt="Resized"
                            className="max-w-full h-auto border border-gray-300 dark:border-gray-600 rounded-lg"
                          />
                          {originalFile && resizedFile && (
                            <div className="mt-2 text-sm text-black dark:text-gray-400">
                              Size reduction: {(((originalFile.size - resizedFile.size) / originalFile.size) * 100).toFixed(1)}%
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-gray-300 mb-2">
                        Width (px)
                      </label>
                      <input
                        type="number"
                        value={resizeWidth}
                        onChange={(e) => setResizeWidth(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-gray-300 mb-2">
                        Height (px)
                      </label>
                      <input
                        type="number"
                        value={resizeHeight}
                        onChange={(e) => setResizeHeight(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-gray-300 mb-2">
                        Quality
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={resizeQuality}
                        onChange={(e) => setResizeQuality(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-sm text-black dark:text-gray-400">{Math.round(resizeQuality * 100)}%</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleResize}
                      disabled={!originalImage || resizing}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resizing ? 'Resizing...' : 'Resize Image'}
                    </button>
                    {resizedImage && (
                      <button
                        onClick={downloadResizedImage}
                        className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
                      >
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTool === 'pdf' && (
              <>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
                  Document to PDF Converter
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-gray-300 mb-2">
                      Select Files (Images or Text)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.txt"
                      onChange={handleFileSelect}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Supported formats: Images (JPG, PNG, etc.) and Text files (.txt)
                    </p>
                  </div>

                  {pdfFiles.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
                        Selected Files ({pdfFiles.length})
                      </h4>
                      <div className={`max-h-32 overflow-y-auto rounded-lg p-3 transition-colors duration-300 ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        {pdfFiles.map((file, index) => (
                          <div key={index} className="text-sm text-black dark:text-gray-300">
                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={convertToPDF}
                    disabled={pdfFiles.length === 0 || converting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {converting ? 'Converting...' : 'Convert to PDF'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
