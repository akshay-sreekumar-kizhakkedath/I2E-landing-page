const API_URL = 'http://localhost:5000/api/problems';

export const getProblems = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch problems');
    }
    return response.json();
};

export const createProblem = async (problemData, token) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(problemData),
    });
    if (!response.ok) {
        throw new Error('Failed to create problem');
    }
    return response.json();
};

export const addSolution = async (problemId, solutionData, token) => {
    const response = await fetch(`${API_URL}/${problemId}/solutions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(solutionData),
    });
    if (!response.ok) {
        throw new Error('Failed to add solution');
    }
    return response.json();
};
