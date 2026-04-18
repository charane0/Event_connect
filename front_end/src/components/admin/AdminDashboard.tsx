import React, { useState, useEffect } from 'react';
import { Check, X, Eye, Mail, Calendar, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = ({ admin, onLogout }) => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchPendingVendors();
  }, []);

  const fetchPendingVendors = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/admin/vendors/pending`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setVendors(data.vendors);
      } else {
        setError(data.message || 'Failed to fetch vendors');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveVendor = async () => {
    if (!selectedVendor) return;

    setApproving(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/admin/vendors/${selectedVendor._id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ approvalNotes: '' }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage(`✅ Vendor "${selectedVendor.userId.name}" approved successfully!`);
        setShowDetails(false);
        setSelectedVendor(null);
        setRejectionReason('');
        setTimeout(() => {
          setSuccessMessage('');
          fetchPendingVendors();
        }, 2000);
      } else {
        setError(data.message || 'Failed to approve vendor');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setApproving(false);
    }
  };

  const handleRejectVendor = async () => {
    if (!selectedVendor || !rejectionReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    setRejecting(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/admin/vendors/${selectedVendor._id}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ rejectionReason }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage(`❌ Vendor "${selectedVendor.userId.name}" rejected successfully!`);
        setShowDetails(false);
        setSelectedVendor(null);
        setRejectionReason('');
        setTimeout(() => {
          setSuccessMessage('');
          fetchPendingVendors();
        }, 2000);
      } else {
        setError(data.message || 'Failed to reject vendor');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setRejecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 text-sm">Welcome, {admin?.name}</p>
          </div>
          <Button onClick={onLogout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex gap-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Review</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{vendors.length}</p>
              </div>
              <AlertCircle className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Vendors</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">-</p>
              </div>
              <FileText className="w-12 h-12 text-indigo-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-2">-</p>
              </div>
              <Check className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Rejected</p>
                <p className="text-3xl font-bold text-red-600 mt-2">-</p>
              </div>
              <X className="w-12 h-12 text-red-200" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vendors List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Pending Vendors for Review ({vendors.length})
                </h2>
              </div>

              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin">⟳</div>
                  <p className="text-gray-600 mt-4">Loading vendors...</p>
                </div>
              ) : vendors.length === 0 ? (
                <div className="p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No pending vendors to review</p>
                  <p className="text-gray-500 text-sm mt-2">All vendors have been processed!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {vendors.map((vendor) => (
                    <div
                      key={vendor._id}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedVendor(vendor);
                        setShowDetails(true);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {vendor.userId.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">{vendor.businessName}</p>
                          <p className="text-gray-500 text-xs mt-2 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {vendor.userId.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                            {vendor.businessType}
                          </span>
                          <p className="text-gray-500 text-xs mt-3 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(vendor.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Step {vendor.verificationStep}/5
                        </span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {vendor.isVerificationComplete
                            ? '✓ Verification Complete'
                            : 'In Progress'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Vendor Details Panel */}
          <div className="lg:col-span-1">
            {showDetails && selectedVendor ? (
              <div className="bg-white rounded-lg shadow overflow-hidden sticky top-8">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">Vendor Details</h3>
                  <button
                    onClick={() => {
                      setShowDetails(false);
                      setSelectedVendor(null);
                      setRejectionReason('');
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
                  {/* Owner Info */}
                  <div>
                    <p className="text-gray-600 text-xs font-semibold uppercase">Owner</p>
                    <p className="text-gray-900 font-semibold mt-1">
                      {selectedVendor.userId.name}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">{selectedVendor.userId.email}</p>
                    {selectedVendor.userId.phone && (
                      <p className="text-gray-600 text-sm">{selectedVendor.userId.phone}</p>
                    )}
                  </div>

                  {/* Business Info */}
                  <div className="border-t pt-4">
                    <p className="text-gray-600 text-xs font-semibold uppercase">Business</p>
                    <p className="text-gray-900 font-semibold mt-1">
                      {selectedVendor.businessName}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Type: {selectedVendor.businessType}
                    </p>
                    {selectedVendor.businessDescription && (
                      <p className="text-gray-600 text-sm mt-2 italic">
                        "{selectedVendor.businessDescription}"
                      </p>
                    )}
                  </div>

                  {/* Documents */}
                  {selectedVendor.businessLicenseNumber && (
                    <div className="border-t pt-4">
                      <p className="text-gray-600 text-xs font-semibold uppercase">Documents</p>
                      <p className="text-gray-900 text-sm mt-2">
                        <strong>License #:</strong> {selectedVendor.businessLicenseNumber}
                      </p>
                      {selectedVendor.taxIdNumber && (
                        <p className="text-gray-900 text-sm">
                          <strong>Tax ID #:</strong> {selectedVendor.taxIdNumber}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Services */}
                  {selectedVendor.services && selectedVendor.services.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-gray-600 text-xs font-semibold uppercase">Services</p>
                      {selectedVendor.services.map((service, idx) => (
                        <div key={idx} className="mt-2 p-2 bg-gray-50 rounded">
                          <p className="text-gray-900 font-semibold text-sm">
                            {service.serviceName}
                          </p>
                          {service.basePrice && (
                            <p className="text-gray-600 text-xs mt-1">
                              ${service.basePrice} {service.currency}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Verification Status */}
                  <div className="border-t pt-4">
                    <p className="text-gray-600 text-xs font-semibold uppercase">
                      Verification Status
                    </p>
                    <p className="text-gray-900 text-sm mt-2">
                      Step {selectedVendor.verificationStep}/5 Complete
                    </p>
                    {selectedVendor.isVerificationComplete && (
                      <p className="text-green-600 text-sm font-semibold mt-2">
                        ✓ All steps completed
                      </p>
                    )}
                  </div>

                  {/* Rejection Reason (if needed) */}
                  <div className="border-t pt-4">
                    <label className="text-gray-600 text-xs font-semibold uppercase block mb-2">
                      Rejection Reason (if rejecting)
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Explain why vendor is being rejected..."
                      rows="3"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 border-t bg-gray-50 space-y-2">
                  <Button
                    onClick={handleApproveVendor}
                    disabled={approving}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {approving ? 'Approving...' : 'Approve Vendor'}
                  </Button>
                  <Button
                    onClick={handleRejectVendor}
                    disabled={rejecting || !rejectionReason.trim()}
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50 font-semibold py-2 gap-2"
                  >
                    <X className="w-4 h-4" />
                    {rejecting ? 'Rejecting...' : 'Reject Vendor'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Select a vendor to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
