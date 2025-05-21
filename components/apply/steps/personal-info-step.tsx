'use client';

import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import ModernFormSection from '../modern-form-section';
import FormField from '@/components/ui/form-field';
import PhoneInput from '@/components/ui/phone-input';
import NominatimAddressAutocomplete from '@/components/ui/nominatim-address-autocomplete';
import { useFormContext } from '../form-context';

export default function PersonalInfoStep() {
  const { 
    formData, 
    errors, 
    handleChange, 
    handleValueChange,
    handleAddressSelect
  } = useFormContext();

  return (
    <ModernFormSection
      title="Personal Information"
      description="Tell us about yourself"
      icon={<UserIcon className="w-5 h-5" />}
      isActive={true}
    >
      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="First Name"
            name="firstName"
            error={errors.firstName}
            required
          >
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className={`w-full bg-dark-100 border ${errors.firstName ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
            />
          </FormField>

          <FormField
            label="Last Name"
            name="lastName"
            error={errors.lastName}
            required
          >
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className={`w-full bg-dark-100 border ${errors.lastName ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
            />
          </FormField>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Email Address"
            name="email"
            error={errors.email}
            required
          >
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className={`w-full bg-dark-100 border ${errors.email ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
            />
          </FormField>

          <FormField
            label="Phone Number"
            name="phone"
            error={errors.phone}
            required
          >
            <PhoneInput
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onValueChange={(value) => handleValueChange('phone', value)}
              error={!!errors.phone}
            />
          </FormField>
        </div>

        {/* Date of Birth */}
        <FormField
          label="Date of Birth"
          name="dateOfBirth"
          error={errors.dateOfBirth}
          required
          tooltip="You must be at least 18 years old to apply"
        >
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            className={`w-full bg-dark-100 border ${errors.dateOfBirth ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
          />
        </FormField>

        {/* Address */}
        <FormField
          label="Street Address"
          name="address"
          error={errors.address}
          required
        >
          <NominatimAddressAutocomplete
            value={formData.address}
            onAddressSelect={handleAddressSelect}
            onValueChange={(value) => handleValueChange('address', value)}
            error={!!errors.address}
          />
        </FormField>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            label="City"
            name="city"
            error={errors.city}
            required
          >
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full bg-dark-100 border ${errors.city ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
            />
          </FormField>

          <FormField
            label="State"
            name="state"
            error={errors.state}
            required
          >
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full bg-dark-100 border ${errors.state ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
            />
          </FormField>

          <FormField
            label="ZIP Code"
            name="zipCode"
            error={errors.zipCode}
            required
          >
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="12345"
              className={`w-full bg-dark-100 border ${errors.zipCode ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
            />
          </FormField>
        </div>
      </div>
    </ModernFormSection>
  );
}
