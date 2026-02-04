import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProblems, createProblem, addSolution, updateProblem, deleteProblem } from '../api/problems';
import ProblemCard from '../components/ProblemCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FluidBackground from '../components/FluidBackground';
import './ProblemBank.css';

const ProblemBank = () => {
    const { currentUser } = useAuth();
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadProblems();
    }, []);

    const loadProblems = async () => {
        try {
            const data = await getProblems();
            setProblems(data);
        } catch (error) {
            console.error('Error fetching problems:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setTitle('');
        setDescription('');
        setDepartment('');
        setEditingId(null);
    };

    const handleSubmitProblem = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('You must be logged in to post a problem.');
            return;
        }

        try {
            if (editingId) {
                // Update existing problem
                const problemData = {
                    title,
                    description,
                    department,
                    uid: currentUser.uid // For simple permission check
                };
                await updateProblem(editingId, problemData);
            } else {
                // Create new problem
                const newProblem = {
                    title,
                    description,
                    department,
                };
                const token = await currentUser.getIdToken();
                await createProblem(newProblem, token);
            }

            resetForm();
            loadProblems(); // Refresh list
        } catch (error) {
            console.error('Error saving problem:', error);
            alert('Failed to save problem.');
        }
    };

    const handleEdit = (problem) => {
        setTitle(problem.title);
        setDescription(problem.description);
        setDepartment(problem.department);
        setEditingId(problem._id);
        setShowForm(true);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (problemId) => {
        if (!window.confirm('Are you sure you want to delete this problem?')) return;

        try {
            await deleteProblem(problemId, currentUser.uid);
            loadProblems();
        } catch (error) {
            console.error('Error deleting problem:', error);
            alert('Failed to delete problem.');
        }
    };

    const handleSubmitSolution = async (problemId, link) => {
        if (!currentUser) {
            alert('You must be logged in to submit a solution.');
            return;
        }

        try {
            const token = await currentUser.getIdToken();
            const solutionData = {
                link,
            };
            await addSolution(problemId, solutionData, token);
            loadProblems(); // Refresh list to show new solution count
        } catch (error) {
            console.error('Error submitting solution:', error);
            alert('Failed to submit solution.');
        }
    };

    return (
        <div className="problem-bank-page">
            <Navbar />
            <div className="problem-bank-container">
                <div className="header-section">
                    <h1>Problem Statement Bank</h1>
                    <p>Explore challenges from various departments and contribute solutions.</p>

                    {currentUser && (
                        <button className="create-btn" onClick={() => {
                            if (showForm) resetForm();
                            else setShowForm(true);
                        }}>
                            {showForm ? 'Cancel' : 'Post a Problem'}
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className="upload-form-card">
                        <h3>{editingId ? 'Edit Problem' : 'Upload New Problem'}</h3>
                        <form onSubmit={handleSubmitProblem}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder="e.g., Automate Inventory Tracking"
                                />
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <input
                                    type="text"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    required
                                    placeholder="e.g., Logistics"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    placeholder="Describe the problem in detail..."
                                    rows="4"
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                {editingId ? 'Update Problem' : 'Publish Problem'}
                            </button>
                        </form>
                    </div>
                )}

                <div className="problems-grid">
                    {loading ? (
                        <p>Loading problems...</p>
                    ) : problems.length === 0 ? (
                        <p>No problem statements found. Be the first to post one!</p>
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
            <Footer />
        </div>
    );
};

export default ProblemBank;
