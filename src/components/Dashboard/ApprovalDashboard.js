import React, { useState, useEffect } from 'react';
import { useApproval } from '../../hooks/useApproval';
import { approvalAPI } from '../../utils/api';
import { formatDateTime, getApprovalStatusColor } from '../../utils/workflowUtils';

const ApprovalList = () => {
  const { setApprovals, pendingApprovals, setPendingApprovals, approve, reject, setError } = useApproval();
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchApprovals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApprovals = async () => {
    try {
      const data = await approvalAPI.getAll();
      setApprovals(data);
      const pending = data.filter(a => a.status === 'pending');
      setPendingApprovals(pending);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleApprove = async (approvalId) => {
    try {
      await approvalAPI.approve(approvalId, {
        approvedBy: 'current-user', // Replace with actual user
      });
      approve({
        id: approvalId,
        approvedBy: 'current-user',
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReject = async (approvalId) => {
    try {
      await approvalAPI.reject(approvalId, {
        rejectedBy: 'current-user',
        reason: rejectReason,
      });
      reject({
        id: approvalId,
        rejectedBy: 'current-user',
        reason: rejectReason,
      });
      setSelectedApproval(null);
      setRejectReason('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Approvals</h1>
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg">
          {pendingApprovals.length} pending
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="col-span-2">
          <div className="bg-white border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Pending Approvals</h2>
            <div className="space-y-3">
              {pendingApprovals.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No pending approvals
                </div>
              ) : (
                pendingApprovals.map(approval => (
                  <div
                    key={approval.id}
                    onClick={() => setSelectedApproval(approval)}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                      selectedApproval?.id === approval.id ? 'bg-blue-50 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{approval.title}</h3>
                        <p className="text-sm text-gray-600">{approval.description}</p>
                        <div className="mt-2 flex gap-2 text-xs text-gray-500">
                          <span>Requested by: {approval.requestedBy}</span>
                          <span>|</span>
                          <span>{formatDateTime(approval.requestedAt)}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getApprovalStatusColor(approval.status)}`}>
                        {approval.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Approval Details & Actions */}
        <div className="col-span-1">
          <div className="bg-white border rounded-lg p-4">
            {selectedApproval ? (
              <div>
                <h2 className="text-lg font-semibold mb-4">Approval Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Title</label>
                    <p className="mt-1">{selectedApproval.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <p className="mt-1 text-sm">{selectedApproval.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Item Type</label>
                    <p className="mt-1 capitalize">{selectedApproval.itemType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Requested By</label>
                    <p className="mt-1">{selectedApproval.requestedBy}</p>
                  </div>

                  {selectedApproval.status === 'pending' && (
                    <div className="space-y-2 mt-6 pt-4 border-t">
                      <button
                        onClick={() => handleApprove(selectedApproval.id)}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <div>
                        <textarea
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Reason for rejection (optional)"
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          rows="3"
                        />
                      </div>
                      <button
                        onClick={() => handleReject(selectedApproval.id)}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Select an approval to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalList;
