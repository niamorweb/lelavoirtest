'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setMessage('Connexion réussie ! 🎉 Bienvenue');
            } else {
                const errorData = await response.json();
                setMessage(`Erreur: ${errorData.msg || 'Connexion échouée. Veuillez réessayer.'}`);
                setIsError(true);
            }
        } catch (error) {
            setMessage(`Erreur: ${error.message}`);
            setIsError(true);
        }
    };

    return (
        <div>
            <div>
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">
                        Se connecter
                    </button>
                </form>

                {message && (
                    <div>
                        {isError ? '⚠️ ' : '🎉 '}
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
