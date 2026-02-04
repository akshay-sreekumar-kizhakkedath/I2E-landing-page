import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProblems, updateProblem, deleteProblem, addSolution } from '../api/problems';
import ProblemCard from '../components/ProblemCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Edit Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (currentUser) {
            loadUserProblems();
        }
    }, [currentUser]);

    const loadUserProblems = async () => {
        try {
            const data = await getProblems(currentUser.uid);
            setProblems(data);
        } catch (error) {
            console.error('Error fetching user problems:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleEdit = (problem) => {
        setTitle(problem.title);
        setDescription(problem.description);
        setDepartment(problem.department);
        setEditingId(problem._id);
        setShowForm(true);
        window.scrollTo(0, 0); // Scroll to top to see form
    };

    const handleDelete = async (problemId) => {
        if (!window.confirm('Are you sure you want to delete this problem?')) return;

        try {
            await deleteProblem(problemId, currentUser.uid);
            loadUserProblems(); // Refresh list
        } catch (error) {
            console.error('Error deleting problem:', error);
            alert('Failed to delete problem.');
        }
    };

    const handleUpdateProblem = async (e) => {
        e.preventDefault();
        try {
            const problemData = {
                title,
                description,
                department,
                uid: currentUser.uid
            };
            await updateProblem(editingId, problemData);

            setShowForm(false);
            setEditingId(null);
            loadUserProblems();
        } catch (error) {
            console.error('Error updating problem:', error);
            alert('Failed to update problem.');
        }
    };

    const cancelEdit = () => {
        setShowForm(false);
        setEditingId(null);
    };

    // Solution submission is less relevant here (usually you submit to others), 
    // but the card expects the prop, so we'll provide the handler.
    const handleSubmitSolution = async (problemId, link) => {
        try {
            const solutionData = {
                link,
                submittedBy: {
                    name: currentUser.displayName || currentUser.email,
                    email: currentUser.email
                }
            };
            await addSolution(problemId, solutionData);
            loadUserProblems();
        } catch (error) {
            console.error('Error submitting solution:', error);
            alert('Failed to submit solution.');
        }
    };

    if (!currentUser) return <div>Loading...</div>;

    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="user-info">
                        <h1>{currentUser.displayName || 'User Profile'}</h1>
                        <p>{currentUser.email}</p>
                    </div>
                </div>

                <div className="my-problems-section">
                    <h2 className="section-title">My Posted Problems</h2>

                    {showForm && (
                        <div className="upload-form-card">
                            <h3>Edit Problem</h3>
                            <form onSubmit={handleUpdateProblem}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Department</label>
                                    <input
                                        type="text"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        rows="4"
                                    />
                                </div>
                                <button type="submit" className="submit-btn">Update Problem</button>
                                <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                            </form>
                        </div>
                    )}

                    <div className="problems-grid">
                        {loading ? (
                            <p>Loading...</p>
                        ) : problems.length === 0 ? (
                            <div className="no-problems">
                                <p>You haven't posted any problems yet.</p>
                            </div>
                        ) : (
                            problems.map(problem => (
                                <ProblemCard
                                    key={problem._id}
                                    problem={problem}
                                    onSubmitSolution={handleSubmitSolution}
                                    currentUser={currentUser}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
