import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import FluidBackground from '../components/FluidBackground';
import './Profile.css';

const Profile = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        department: '',
        year: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setFormData({ ...docSnap.data(), displayName: currentUser.displayName || docSnap.data().displayName || '' });
                    } else {
                        // Pre-fill with auth data if no firestore data
                        setFormData(prev => ({ ...prev, displayName: currentUser.displayName || '' }));
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserData();
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const docRef = doc(db, "users", currentUser.uid);
            await setDoc(docRef, {
                displayName: formData.displayName,
                department: formData.department,
                year: formData.year,
                email: currentUser.email
            }, { merge: true });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-container">
            <FluidBackground />
            <div className="profile-card">
                <h1>My Profile</h1>
                <div className="profile-avatar">
                    {currentUser.photoURL ? (
                        <img src={currentUser.photoURL} alt="Profile" />
                    ) : (
                        <div className="avatar-placeholder">{formData.displayName?.charAt(0) || 'U'}</div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={currentUser.email}
                            disabled
                            className="disabled-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        >
                            <option value="">Select Department</option>
                            <option value="CSE">Computer Science (CSE)</option>
                            <option value="IT">Information Technology (IT)</option>
                            <option value="ECE">Electronics & Communication (ECE)</option>
                            <option value="EEE">Electrical & Electronics (EEE)</option>
                            <option value="MECH">Mechanical Engineering</option>
                            <option value="CIVIL">Civil Engineering</option>
                            <option value="AIML">AI & ML</option>
                            <option value="DS">Data Science</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>current Year</label>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                        >
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>

                    <button type="submit" className="save-btn" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
