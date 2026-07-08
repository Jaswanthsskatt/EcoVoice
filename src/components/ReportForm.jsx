import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function ReportForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    issue: '',
    location: '',
    description: '',
    files: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: e.target.files
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.issue || !formData.location || !formData.description) {
      alert('Please fill in all required fields')
      return
    }

    // Call parent component's onSubmit callback
    if (onSubmit) {
      onSubmit({
        issue: formData.issue,
        location: formData.location,
        description: formData.description
      })
    }

    // Reset form
    setFormData({
      issue: '',
      location: '',
      description: '',
      files: null
    })
  }

  return (

    <div className="bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-4xl font-bold mb-2">
        Report an Environmental Issue
      </h2>

      <p className="text-gray-500 mb-8">
        Help us protect our environment by reporting issues in your community.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>

          <label className="font-semibold block mb-2">
            Issue Type
          </label>

          <select 
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >

            <option value="">Select issue type</option>

            <option value="Air Pollution">Air Pollution</option>

            <option value="Water Pollution">Water Pollution</option>

            <option value="Illegal Dumping">Illegal Dumping</option>

            <option value="Tree Cutting">Tree Cutting</option>

            <option value="Noise Pollution">Noise Pollution</option>

          </select>

        </div>

        <div>

          <label className="font-semibold block mb-2">
            Location
          </label>

          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div>

          <label className="font-semibold block mb-2">
            Description
          </label>

          <textarea
            rows="6"
            name="description"
            className="w-full border rounded-lg p-3"
            placeholder="Describe the issue..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>

        </div>

        <div>

          <label className="font-semibold block mb-3">
            Upload Images / Videos
          </label>

          <div className="border-2 border-dashed rounded-xl p-12 text-center">

            <FaCloudUploadAlt
              className="mx-auto text-green-600"
              size={60}
            />

            <h3 className="font-bold mt-4">
              Drag & Drop Files
            </h3>

            <p className="text-gray-500 mt-2">
              or click to browse
            </p>

            <input
              type="file"
              onChange={handleFileChange}
              className="mt-5"
            />

          </div>

        </div>

        <button 
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg"
        >

          Submit Report

        </button>

      </form>

    </div>

  );

}

export default ReportForm;

