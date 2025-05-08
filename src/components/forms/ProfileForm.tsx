import React from 'react';

interface Props {
    name: string;
    email: string;
    editMode: boolean;
    loading: boolean;
    errorMsg: string | null;
    onNameChange: (v: string) => void;
    onEmailChange: (v: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onEditToggle: () => void;
    onLogout: () => void;
}

export const ProfileForm: React.FC<Props> = ({
    name,
    email,
    editMode,
    loading,
    errorMsg,
    onNameChange,
    onEmailChange,
    onSave,
    onCancel,
    onEditToggle,
    onLogout
}) => (
    <div className="max-w-md w-full bg-offwhite border border-beige rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">Your Profile</h2>
        {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    value={name}
                    disabled={!editMode}
                    onChange={e => onNameChange(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white ${!editMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    disabled={!editMode}
                    onChange={e => onEmailChange(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white ${!editMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
            </div>
        </div>
        <div className="mt-6 flex justify-between">
            {editMode ? (
                <>
                    <button
                        onClick={onSave}
                        disabled={loading}
                        className="bg-red-400 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Saving…' : 'Save'}
                    </button>
                    <button
                        onClick={onCancel}
                        className="text-gray-600 font-medium py-2 px-4 rounded-lg hover:text-gray-800 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={onEditToggle}
                        className="bg-red-400 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={onLogout}
                        className="text-gray-600 font-medium py-2 px-4 rounded-lg hover:text-gray-800 transition-colors duration-200"
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    </div>
);