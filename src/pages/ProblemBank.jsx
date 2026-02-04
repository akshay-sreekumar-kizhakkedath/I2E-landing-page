import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProblems, createProblem, addSolution } from '../api/problems';
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

    const handleCreateProblem = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('You must be logged in to post a problem.');
            return;
        }

        try {
            const token = await currentUser.getIdToken();
            const newProblem = {
                title,
                description,
                department,
                // createdBy is now handled by backend from token
            };

            await createProblem(newProblem, token);
            setShowForm(false);
            setTitle('');
            setDescription('');
            setDepartment('');
            loadProblems(); // Refresh list
        } catch (error) {
            console.error('Error creating problem:', error);
            alert('Failed to create problem.');
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
                // submittedBy is now handled by backend from token
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
                        <button className="create-btn" onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Cancel' : 'Post a Problem'}
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className="upload-form-card">
                        <h3>Upload New Problem</h3>
                        <form onSubmit={handleCreateProblem}>
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
                            <button type="submit" className="submit-btn">Publish Problem</button>
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
