import React, { useState } from 'react';
import './JoinUs.css';

const JoinUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        portfolioUrl: '',
        resumeUrl: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Application submitted successfully! We will get back to you soon.' });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    position: '',
                    portfolioUrl: '',
                    resumeUrl: ''
                });
            } else {
                setStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to connect to the server. Please check your connection.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="join-us" className="join-us-section">
            <div className="join-us-container max-w-4xl">
                <div className="text-center mb-10">
                    <h2 className="join-us-title">
                        Join Our Team
                    </h2>
                    <p className="join-us-subtitle">
                        Ready to make an impact? Send us your application.
                    </p>
                </div>

                {status.message && (
                    <div className={`status-message ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Position Applied For *</label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="e.g. Frontend Developer"
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label className="form-label">Portfolio / LinkedIn URL</label>
                        <input
                            type="url"
                            name="portfolioUrl"
                            value={formData.portfolioUrl}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Resume URL (Google Drive, Dropbox, etc.) *</label>
                        <input
                            type="url"
                            name="resumeUrl"
                            value={formData.resumeUrl}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="https://drive.google.com/file/d/..."
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginLeft: '0.25rem' }}>
                            Please ensure the link is publicly accessible or shareable.
                        </p>
                    </div>

                    <div style={{ paddingTop: '1rem' }}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="submit-btn"
                        >
                            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default JoinUs;
