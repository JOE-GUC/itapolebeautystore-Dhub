"use client";
import React, { useState } from "react";
import {
  Upload,
  Trash2,
  Plus,
  MinusCircle,
  Save,
  AlertCircle,
  Package,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar"; // Adjust import path as needed
import Footer from "@/components/Footer"; // Adjust import path as needed

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    cost: "",
    sku: "",
    barcode: "",
    quantity: "",
    category: "",
    tags: [],
    images: [],
    variants: [],
    specifications: [],
    seoTitle: "",
    seoDescription: "",
    status: "draft",
  });

  const [newTag, setNewTag] = useState("");
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Toys",
    "Beauty",
    "Automotive",
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setProductData({
      ...productData,
      images: [...productData.images, ...newImages],
    });
  };

  const removeImage = (index) => {
    const newImages = [...productData.images];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setProductData({ ...productData, images: newImages });
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    if (newTag.trim() && !productData.tags.includes(newTag.trim())) {
      setProductData({
        ...productData,
        tags: [...productData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setProductData({
      ...productData,
      tags: productData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSpecificationAdd = (e) => {
    e.preventDefault();
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setProductData({
        ...productData,
        specifications: [
          ...productData.specifications,
          { key: newSpecKey.trim(), value: newSpecValue.trim() },
        ],
      });
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const removeSpecification = (index) => {
    const newSpecs = [...productData.specifications];
    newSpecs.splice(index, 1);
    setProductData({ ...productData, specifications: newSpecs });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!productData.name) newErrors.name = "Product name is required";
    if (!productData.price) newErrors.price = "Price is required";
    if (!productData.category) newErrors.category = "Category is required";
    if (productData.images.length === 0)
      newErrors.images = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Product data:", productData);
      // Handle success (redirect or show success message)
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600 mt-2">
                Fill in the details below to add a new product to your store
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    value={productData.name}
                    onChange={(e) =>
                      setProductData({ ...productData, name: e.target.value })
                    }
                    className={`mt-1 block w-full rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } px-4 py-3 focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category*
                  </label>
                  <select
                    value={productData.category}
                    onChange={(e) =>
                      setProductData({ ...productData, category: e.target.value })
                    }
                    className={`mt-1 block w-full rounded-lg border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } px-4 py-3 focus:border-blue-500 focus:ring-blue-500`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price*
                  </label>
                  <div className="mt-1 relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={productData.price}
                      onChange={(e) =>
                        setProductData({ ...productData, price: e.target.value })
                      }
                      className={`block w-full rounded-lg border ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      } pl-7 pr-4 py-3 focus:border-blue-500 focus:ring-blue-500`}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Compare at Price
                  </label>
                  <div className="mt-1 relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={productData.comparePrice}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          comparePrice: e.target.value,
                        })
                      }
                      className="block w-full rounded-lg border border-gray-300 pl-7 pr-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cost per Item
                  </label>
                  <div className="mt-1 relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={productData.cost}
                      onChange={(e) =>
                        setProductData({ ...productData, cost: e.target.value })
                      }
                      className="block w-full rounded-lg border border-gray-300 pl-7 pr-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Inventory */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={productData.sku}
                    onChange={(e) =>
                      setProductData({ ...productData, sku: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter SKU"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Barcode
                  </label>
                  <input
                    type="text"
                    value={productData.barcode}
                    onChange={(e) =>
                      setProductData({ ...productData, barcode: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter barcode"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={productData.quantity}
                    onChange={(e) =>
                      setProductData({ ...productData, quantity: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter quantity"
                    min="0"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Product Images*
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {productData.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={image.url}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <label className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400" />
                      <span className="mt-2 block text-sm text-gray-600">
                        Add Images
                      </span>
                    </div>
                  </label>
                </div>
                {errors.images && (
                  <p className="mt-2 text-sm text-red-500">{errors.images}</p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {productData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <MinusCircle className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <form onSubmit={handleTagAdd} className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Add a tag"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Specifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specifications
                </label>
                <div className="space-y-3 mb-4">
                  {productData.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{spec.key}:</span>{" "}
                        {spec.value}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleSpecificationAdd}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <input
                    type="text"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Specification key"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Specification value"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>

              {/* SEO */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Search Engine Optimization
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={productData.seoTitle}
                    onChange={(e) =>
                      setProductData({ ...productData, seoTitle: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter SEO title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SEO Description
                  </label>
                  <textarea
                    value={productData.seoDescription}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        seoDescription: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter SEO description"
                  />
                </div>
              </div>

              {/* Status and Submit */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <select
                    value={productData.status}
                    onChange={(e) =>
                      setProductData({ ...productData, status: e.target.value })
                    }
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="draft">Save as Draft</option>
                    <option value="published">Publish</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Save Product</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProductPage;
