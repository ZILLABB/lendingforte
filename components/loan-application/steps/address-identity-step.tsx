"use client";

import { useState, useEffect } from "react";
import { IdentificationIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import AddressAutocomplete from "../address-autocomplete";

interface AddressIdentityStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formErrors: Record<string, string>;
}

export default function AddressIdentityStep({ formData, handleChange, formErrors }: AddressIdentityStepProps) {
  const [states, setStates] = useState<string[]>([
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
  ]);

  // Handle address selection from autocomplete
  const handleAddressSelect = (address: any) => {
    console.log("Address selected:", address);

    // Create synthetic events for each address component
    const events = [
      {
        target: {
          name: 'streetAddress',
          value: address.street,
          type: 'text'
        }
      },
      {
        target: {
          name: 'city',
          value: address.city,
          type: 'text'
        }
      },
      {
        target: {
          name: 'state',
          value: address.state,
          type: 'text'
        }
      },
      {
        target: {
          name: 'zipCode',
          value: address.zipCode,
          type: 'text'
        }
      }
    ];

    // Apply each change
    events.forEach(event => {
      handleChange(event as React.ChangeEvent<HTMLInputElement>);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
        <IdentificationIcon className="w-6 h-6 mr-2 text-green-400" /> Address & Identity
      </h2>

      <div className="space-y-6">
        {/* Address Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-4 flex items-center">
            <MapPinIcon className="w-5 h-5 mr-2 text-green-400" /> Residential Address
          </h3>

          {/* Address Autocomplete */}
          <div className="mb-6">
            <label htmlFor="addressAutocomplete" className="text-sm font-medium text-gray-300 mb-1 block">
              Search Address <span className="text-gray-500">(or enter manually below)</span>
            </label>
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
          </div>

          {/* Street Address */}
          <div className="space-y-1 mb-4">
            <label htmlFor="streetAddress" className="text-sm font-medium text-gray-300">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.streetAddress ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="streetAddress"
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="123 Main St"
              required
            />
            {formErrors.streetAddress && <p className="text-xs text-red-400 mt-1">{formErrors.streetAddress}</p>}
          </div>

          {/* Apartment/Unit */}
          <div className="space-y-1 mb-4">
            <label htmlFor="apartmentUnit" className="text-sm font-medium text-gray-300">
              Apartment/Unit <span className="text-gray-500">(optional)</span>
            </label>
            <input
              className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
              id="apartmentUnit"
              type="text"
              name="apartmentUnit"
              value={formData.apartmentUnit}
              onChange={handleChange}
              placeholder="Apt 4B"
            />
          </div>

          {/* City, State, Zip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label htmlFor="city" className="text-sm font-medium text-gray-300">
                City <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                  focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.city ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New York"
                required
              />
              {formErrors.city && <p className="text-xs text-red-400 mt-1">{formErrors.city}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="state" className="text-sm font-medium text-gray-300">
                State <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                  focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.state ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {formErrors.state && <p className="text-xs text-red-400 mt-1">{formErrors.state}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="zipCode" className="text-sm font-medium text-gray-300">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                  focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.zipCode ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                id="zipCode"
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="10001"
                maxLength={10}
                required
              />
              {formErrors.zipCode && <p className="text-xs text-red-400 mt-1">{formErrors.zipCode}</p>}
            </div>
          </div>
        </div>

        {/* Housing Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label htmlFor="yearsAtAddress" className="text-sm font-medium text-gray-300">
              Years at Current Address <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.yearsAtAddress ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="yearsAtAddress"
              name="yearsAtAddress"
              value={formData.yearsAtAddress}
              onChange={handleChange}
              required
            >
              <option value="">Select Years</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value="1-2 years">1-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="6-10 years">6-10 years</option>
              <option value="More than 10 years">More than 10 years</option>
            </select>
            {formErrors.yearsAtAddress && <p className="text-xs text-red-400 mt-1">{formErrors.yearsAtAddress}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="housingStatus" className="text-sm font-medium text-gray-300">
              Housing Status <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.housingStatus ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="housingStatus"
              name="housingStatus"
              value={formData.housingStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Own">Own</option>
              <option value="Rent">Rent</option>
              <option value="Living with parents">Living with parents</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.housingStatus && <p className="text-xs text-red-400 mt-1">{formErrors.housingStatus}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="monthlyHousingCost" className="text-sm font-medium text-gray-300">
              Monthly Housing Cost <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">$</span>
              </div>
              <input
                className={`w-full bg-gray-700 rounded-lg pl-7 px-4 py-3 text-gray-100 placeholder-gray-400
                  focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.monthlyHousingCost ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                id="monthlyHousingCost"
                type="number"
                name="monthlyHousingCost"
                value={formData.monthlyHousingCost}
                onChange={handleChange}
                placeholder="1200"
                min="0"
                step="1"
                required
              />
            </div>
            {formErrors.monthlyHousingCost && <p className="text-xs text-red-400 mt-1">{formErrors.monthlyHousingCost}</p>}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-8 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
        <p className="text-sm text-gray-300">
          <span className="font-semibold">Security Notice:</span> Your address information is used for identity verification
          purposes and will be kept confidential in accordance with our
          <a href="/privacy-policy" className="text-green-400 hover:text-green-300 ml-1">Privacy Policy</a>.
        </p>
      </div>
    </motion.div>
  );
}
