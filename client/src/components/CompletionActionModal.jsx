import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CompleteActionModal = ({ ticket, onClose, onCompleteAction }) => {
  const [actionTaken, setActionTaken] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState({
    hardware: false,
    lan: false,
    internet: false,
    HIS: false,
    LIS: false,
    LMS: false,
    DMS: false,
    E_NGAS: false,
    PHIC: false,
    website: false,
    training: false,
  });

  if (!ticket) return null;

  const handleSubmit = () => {
    if (actionTaken.trim() && recommendation.trim()) {
      onCompleteAction(ticket._id, actionTaken, recommendation, selectedCategories);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
  
    // Update the selected categories state
    const updatedCategories = {
      ...selectedCategories,
      [name]: checked,
    };
    
    setSelectedCategories(updatedCategories);
  
    // Update actionTaken based on the checked state
    const checkedActions = Object.keys(updatedCategories)
      .filter(key => updatedCategories[key])
      .map(key => key.charAt(0).toUpperCase() + key.slice(1))
      .join(', ');
  
    setActionTaken(checkedActions ? `${checkedActions}` : '');
  };

  const isSubmitDisabled = !actionTaken.trim() || !recommendation.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-[550px] max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              TICKET DETAILS
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            {/* Categories with Checkboxes */}
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Computer Component */}
              <div className="flex flex-col">
                <strong>Computer Component:</strong>
                <div className="flex flex-col">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="hardware"
                      checked={selectedCategories.hardware}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Hardware
                  </label>
                </div>
              </div>

              {/* Network */}
              <div className="flex flex-col">
                <strong>Network:</strong>
                <div className="flex flex-col">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="lan"
                      checked={selectedCategories.lan}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    LAN
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="internet"
                      checked={selectedCategories.internet}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Internet
                  </label>
                </div>
              </div>

              {/* System */}
              <div className="flex flex-col">
                <strong>System:</strong>
                <div className="flex flex-col">
                  {['HIS', 'LIS', 'LMS', 'DMS', 'E_NGAS', 'PHIC'].map(system => (
                    <label key={system} className="flex items-center">
                      <input
                        type="checkbox"
                        name={system}
                        checked={selectedCategories[system]}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      {system}
                    </label>
                  ))}
                </div>
              </div>

              {/* Website */}
              <div className="flex flex-col">
                <strong>Website:</strong>
                <div className="flex flex-col">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="website"
                      checked={selectedCategories.website}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Website
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="training"
                      checked={selectedCategories.training}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Training
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <strong>DESCRIPTION:</strong> {ticket.comments.length > 0 ? ticket.comments[0].descriptionProblem : 'N/A'}
            </div>

            {/* Flex Container for Action Taken and Recommendation */}
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
              <div className="flex-1">
                <label htmlFor="actionTaken" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Action Taken:
                </label>
                <textarea
                  id="actionTaken"
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  placeholder="Describe the actions taken to resolve the ticket"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recommendation:
                </label>
                <textarea
                  id="recommendation"
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  placeholder="Any recommendations?"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
              <button
                onClick={onClose}
                className="w-full text-black bg-gray-300 hover:bg-gray-400 rounded-lg text-sm px-5 py-2.5 text-center mt-2 md:mt-0"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className={`w-full text-white ${isSubmitDisabled ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteActionModal;
