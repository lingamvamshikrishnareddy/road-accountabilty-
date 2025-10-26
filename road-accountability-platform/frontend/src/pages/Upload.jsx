import { useState } from 'react';
import { Upload as UploadIcon, FileText, X, CheckCircle } from 'lucide-react';
import { documentsAPI } from '../services/api';
import { DOCUMENT_TYPES } from '../utils/constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Upload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    document_type: '',
    road_id: '',
    file: null,
  });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign In Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to sign in to upload documents
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="btn-primary"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      setFormData({ ...formData, file });
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const removeFile = () => {
    setFormData({ ...formData, file: null });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      setUploading(true);
      const uploadData = new FormData();
      uploadData.append('file', formData.file);
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('document_type', formData.document_type);
      if (formData.road_id) {
        uploadData.append('road_id', formData.road_id);
      }

      await documentsAPI.upload(uploadData);
      toast.success('Document uploaded successfully! It will be reviewed soon.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        document_type: '',
        road_id: '',
        file: null,
      });
      setPreview(null);
    } catch (error) {
      toast.error('Failed to upload document');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Document
          </h1>
          <p className="text-gray-600">
            Share documents related to road projects, contracts, or incidents
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Title *
              </label>
              <input
                type="text"
                name="title"
                required
                className="input-field"
                placeholder="e.g., NH-44 Contract Document"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows="4"
                className="input-field"
                placeholder="Provide details about this document..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type *
              </label>
              <select
                name="document_type"
                required
                className="input-field"
                value={formData.document_type}
                onChange={handleChange}
              >
                <option value="">Select type</option>
                {Object.entries(DOCUMENT_TYPES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Road ID (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Related Road Project ID (Optional)
              </label>
              <input
                type="text"
                name="road_id"
                className="input-field"
                placeholder="Enter road project ID if applicable"
                value={formData.road_id}
                onChange={handleChange}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File *
              </label>
              
              {!formData.file ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
                    <span className="text-sm text-gray-600 mb-2">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-gray-500">
                      PDF, DOC, XLS, JPG, PNG up to 10MB
                    </span>
                  </label>
                </div>
              ) : (
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <FileText className="w-8 h-8 text-gray-400" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {formData.file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Your document will be reviewed</p>
                  <p>
                    All uploads are reviewed by moderators before being published to
                    ensure accuracy and relevance.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;