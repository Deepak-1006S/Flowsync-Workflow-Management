import React, { useState, useEffect } from 'react';
import { useAutomation } from '../../hooks/useAutomation';
import { automationAPI } from '../../utils/api';

const AutomationRules = () => {
  const { rules, setRules, triggers, setTriggers, actions, setActions, toggleRule, deleteRule, setError } = useAutomation();
  const [showEditor, setShowEditor] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    trigger: '',
    conditions: [],
    actions: [],
    enabled: true,
  });

  useEffect(() => {
    fetchRules();
    fetchTriggers();
    fetchActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRules = async () => {
    try {
      const data = await automationAPI.getRules();
      setRules(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchTriggers = async () => {
    try {
      const data = await automationAPI.getTriggers();
      setTriggers(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchActions = async () => {
    try {
      const data = await automationAPI.getActions();
      setActions(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSaveRule = async () => {
    try {
      if (selectedRule) {
        const updated = await automationAPI.updateRule(selectedRule.id, formData);
        setRules(rules.map(r => r.id === selectedRule.id ? updated : r));
      } else {
        const created = await automationAPI.createRule(formData);
        setRules([...rules, created]);
      }
      resetForm();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteRule = async (id) => {
    if (window.confirm('Delete this rule?')) {
      try {
        await automationAPI.deleteRule(id);
        deleteRule(id);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleToggleRule = async (id) => {
    try {
      const rule = rules.find(r => r.id === id);
      await automationAPI.toggleRule(id, !rule.enabled);
      toggleRule(id);
    } catch (error) {
      setError(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      trigger: '',
      conditions: [],
      actions: [],
      enabled: true,
    });
    setSelectedRule(null);
    setShowEditor(false);
  };

  const handleEditRule = (rule) => {
    setSelectedRule(rule);
    setFormData(rule);
    setShowEditor(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Automation Rules</h1>
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showEditor ? 'Cancel' : '+ New Rule'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Rules List */}
        <div className="col-span-2">
          <div className="bg-white border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Active Rules</h2>
            <div className="space-y-3">
              {rules.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No automation rules created yet
                </div>
              ) : (
                rules.map(rule => (
                  <div key={rule.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={rule.enabled}
                            onChange={() => handleToggleRule(rule.id)}
                            className="w-4 h-4 rounded"
                          />
                          <h3 className="font-semibold">{rule.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{rule.description}</p>
                        <div className="ml-6 mt-2 flex gap-2 text-xs">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Trigger: {rule.trigger}
                          </span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                            Actions: {rule.actions?.length || 0}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditRule(rule)}
                          className="px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRule(rule.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Rule Editor */}
        {showEditor && (
          <div className="col-span-1">
            <div className="bg-white border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">
                {selectedRule ? 'Edit Rule' : 'Create Rule'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rule Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter rule name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Trigger</label>
                  <select
                    value={formData.trigger}
                    onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Select trigger</option>
                    {triggers.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Actions</label>
                  <div className="space-y-2">
                    {actions.map(action => (
                      <label key={action} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.actions.includes(action)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                actions: [...formData.actions, action]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                actions: formData.actions.filter(a => a !== action)
                              });
                            }
                          }}
                          className="w-4 h-4 rounded"
                        />
                        <span className="ml-2 text-sm">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSaveRule}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Rule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomationRules;
