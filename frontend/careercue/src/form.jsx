import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {  useNavigate } from 'react-router-dom';

const ExperienceForm = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [experience, setExperience] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();
    const backendUrl = process.env.BACKEND_URL;
    const handleSubmit = async (e) => {
        const jwtToken = localStorage.getItem('authToken');
        console.log("jwtToken from form page:",jwtToken)
        e.preventDefault();
        const formData = {
            title,
            company,
            role,
            experience,
            tags: tags.split(',').map(tag => tag.trim())
        };

        try {
            const response = await axios.post({backendUrl}, formData,{
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            navigate('/blogs');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Card x-chunk="dashboard-06x`-chunk-0">
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="max-w-3xl w-full p-8 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">Create Blog</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Title:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Company:</label>
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Role:</label>
                            <input
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Experience:</label>
                            <ReactQuill
                                value={experience}
                                onChange={setExperience}
                                theme="snow"
                                className="bg-white h-60 mb-4"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Tags (comma separated):</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Submit</button>
                    </form>
                </div>
            </div>
        </Card>
    );
};

export default ExperienceForm;
