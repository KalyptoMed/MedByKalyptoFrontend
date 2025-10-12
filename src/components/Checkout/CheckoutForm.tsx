'use client'

import React, { useState } from 'react';
import { Package } from 'lucide-react';

type DeliveryMethod = 'shipping' | 'pickup';

export interface DeliveryFormData {
  deliveryMethod: DeliveryMethod;
  country: string;
  firstName: string;
  surname: string;
  address: string;
  apartment: string;
  city1: string;
  city2: string;
  city3: string;
  phoneNo: string;
  saveDetails: boolean;
}

interface DeliveryFormProps {
  onSubmit?: (data: DeliveryFormData) => void;
  defaultCountry?: string;
}

export function DeliveryForm({ defaultCountry = 'Nigeria' }: DeliveryFormProps) {
  const [formData, setFormData] = useState<DeliveryFormData>({
    deliveryMethod: 'shipping',
    country: defaultCountry,
    firstName: '',
    surname: '',
    address: '',
    apartment: '',
    city1: '',
    city2: '',
    city3: '',
    phoneNo: '',
    saveDetails: false,
  });

  const handleInputChange = (field: keyof DeliveryFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-3xl">
      {/* Section Title */}


      {/* Delivery Method Selection */}
      <div className="space-y-3 mb-8">
        {/* Shipping Option */}
        <label
          className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
            formData.deliveryMethod === 'shipping'
              ? 'border-cyan-400 bg-cyan-50'
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="deliveryMethod"
              value="shipping"
              checked={formData.deliveryMethod === 'shipping'}
              onChange={(e) => handleInputChange('deliveryMethod', e.target.value as DeliveryMethod)}
              className="w-5 h-5 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-teal-900 font-medium">Shipping</span>
          </div>
          <Package className="text-teal-700" size={24} />
        </label>

        {/* Pickup Option */}
        <label
          className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
            formData.deliveryMethod === 'pickup'
              ? 'border-cyan-400 bg-cyan-50'
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="deliveryMethod"
              value="pickup"
              checked={formData.deliveryMethod === 'pickup'}
              onChange={(e) => handleInputChange('deliveryMethod', e.target.value as DeliveryMethod)}
              className="w-5 h-5 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-teal-900 font-medium">Pickup in store</span>
          </div>
          <Package className="text-teal-700" size={24} />
        </label>
      </div>

      {/* Details Section */}
      <h3 className="text-xl font-bold text-teal-900 mb-4">Details</h3>

      <div className="space-y-4">
        {/* Country/Region */}
        <div>
          <label className="block text-sm font-medium text-teal-800 mb-2">
            Country/Region
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition"
            placeholder="Nigeria"
          />
        </div>

        {/* First Name and Surname */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-teal-800 mb-2">
              First name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-800 mb-2">
              Surname
            </label>
            <input
              type="text"
              value={formData.surname}
              onChange={(e) => handleInputChange('surname', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition"
              placeholder="Surname"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-teal-800 mb-2">
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition"
            placeholder="Address"
          />
        </div>

        {/* Apartment, Suites etc. */}
        <div>
          <label className="block text-sm font-medium text-teal-800 mb-2">
            Apartment, Suites etc.*
          </label>
          <input
            type="text"
            value={formData.apartment}
            onChange={(e) => handleInputChange('apartment', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition"
            placeholder="Apartment, Suites etc."
          />
        </div>

        {/* Three City Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-teal-800 mb-2">
              City
            </label>
            <input
              type="text"
              value={formData.city1}
              onChange={(e) => handleInputChange('city1', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-800 mb-2">
              City
            </label>
            <input
              type="text"
              value={formData.city2}
              onChange={(e) => handleInputChange('city2', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-800 mb-2">
              City
            </label>
            <input
              type="text"
              value={formData.city3}
              onChange={(e) => handleInputChange('city3', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition"
              placeholder="City"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-teal-800 mb-2">
            Phone No.
          </label>
          <input
            type="tel"
            value={formData.phoneNo}
            onChange={(e) => handleInputChange('phoneNo', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition"
            placeholder="Phone No."
          />
        </div>

        {/* Save Details Checkbox */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="saveDetails"
            checked={formData.saveDetails}
            onChange={(e) => handleInputChange('saveDetails', e.target.checked)}
            className="w-5 h-5 text-teal-600 border-2 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
          />
          <label
            htmlFor="saveDetails"
            className="text-teal-900 font-medium cursor-pointer select-none"
          >
            Save my delivery details for future purchases
          </label>
        </div>
      </div>
    </div>
  );
}