import React, { useState } from 'react';
import './ProblemCard.css';

const ProblemCard = ({ problem, onSubmitSolution, currentUser, onEdit, onDelete }) => {
    const [solutionLink, setSolutionLink] = useState('');
    const [showSolutionForm, setShowSolutionForm] = useState(false);

    const isOwner = currentUser && problem.createdBy && currentUser.uid === problem.createdBy.uid;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitSolution(problem._id, solutionLink);
        setSolutionLink('');
        setShowSolutionForm(false);
    };

    return (
        <div className="problem-card">
            <div className="card-header">
                <span className="department-tag">{problem.department}</span>
                <div className="header-actions">
                    {isOwner && (
                        <>
                            <button className="icon-btn edit-btn" onClick={() => onEdit(problem)} title="Edit Problem">
                                ✎
                            </button>
                            <button className="icon-btn delete-btn" onClick={() => onDelete(problem._id)} title="Delete Problem">
                                🗑️
                            </button>
                        </>
                    )}
                    <span className="date-tag">{new Date(problem.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <h2 className="problem-title">{problem.title}</h2>
            <p className="problem-description">{problem.description}</p>

            <div className="card-footer">
                <div className="author-info">
                    <span className="label">Posted by:</span>
                    <span className="value">{problem.createdBy?.name || 'Anonymous'}</span>
                </div>

                <div className="solutions-info">
                    <span className="count">{problem.solutions?.length || 0} Solutions</span>
                </div>
            </div>

            <div className="actions-section">
                {currentUser ? (
                    <>
                        <button
                            className="toggle-solution-btn"
                            onClick={() => setShowSolutionForm(!showSolutionForm)}
                        >
                            {showSolutionForm ? 'Cancel' : 'Submit Solution'}
                        </button>
                    </>
                ) : (
                    <p className="login-hint">Log in to submit a solution</p>
                )}
            </div>

            {showSolutionForm && (
                <form onSubmit={handleSubmit} className="solution-form">
                    <input
                        type="url"
                        placeholder="Paste your solution link (GitHub, Drive, etc.)"
                        value={solutionLink}
                        onChange={(e) => setSolutionLink(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )}

            {problem.solutions && problem.solutions.length > 0 && (
                <div className="solutions-list">
                    <h4>Recent Solutions:</h4>
                    <ul>
                        {problem.solutions.slice(0, 3).map((sol, index) => (
                            <li key={index}>
                                <a href={sol.link} target="_blank" rel="noopener noreferrer">
                                    Solution by {sol.submittedBy?.name || 'Anonymous'}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProblemCard;
