import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { ProfileForm } from '../components/forms/ProfileForm';

export const ProfilePage: React.FC = () => {
    const {
        name,
        email,
        editMode,
        loading,
        errorMsg,
        setName,
        setEmail,
        setEditMode,
        save,
        signOut
    } = useProfile();

    return (
        <div className="h-[calc(100vh-8rem)] bg-cream flex items-center justify-center">
            <ProfileForm
                name={name}
                email={email}
                editMode={editMode}
                loading={loading}
                errorMsg={errorMsg}
                onNameChange={setName}
                onEmailChange={setEmail}
                onSave={save}
                onCancel={() => setEditMode(false)}
                onEditToggle={() => setEditMode(true)}
                onLogout={signOut}
            />
        </div>
    );
};
