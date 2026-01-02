'use client';

import { useState, FormEvent } from 'react';

export default function TerminalForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // In a real app, this would send data
        alert('git push origin message: Success!');
    };

    return (
        <div className="w-full max-w-4xl mx-auto font-mono text-sm shadow-2xl rounded-lg overflow-hidden bg-[#1e1e1e] border border-[#333]">
            {/* VS Code Header */}
            <div className="bg-[#252526] p-2 flex items-center justify-between border-b border-[#333]">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-gray-400">contact.tsx — Portfolio</div>
                <div />
            </div>

            <div className="flex">
                {/* Line Numbers */}
                <div className="bg-[#1e1e1e] p-4 text-right text-gray-500 border-r border-[#333] hidden sm:block select-none">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>

                {/* Code Editor Area */}
                <div className="p-4 w-full bg-[#1e1e1e] text-off-white">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="text-pink-500 mr-2">const</span>
                            <span className="text-blue-400 mr-2">sender</span>
                            <span className="text-white mr-2">=</span>
                            <span className="text-yellow-300 mr-1">{'{'}</span>
                        </div>

                        <div className="pl-8 space-y-2">
                            <div className="flex items-center">
                                <span className="text-sky-300 mr-2">name:</span>
                                <span className="text-orange-300">"</span>
                                <input
                                    type="text"
                                    required
                                    placeholder="Your Name"
                                    className="bg-transparent border-none outline-none text-green-400 placeholder-gray-600 focus:ring-0 p-0 w-full"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <span className="text-orange-300">",</span>
                            </div>

                            <div className="flex items-center">
                                <span className="text-sky-300 mr-2">email:</span>
                                <span className="text-orange-300">"</span>
                                <input
                                    type="email"
                                    required
                                    placeholder="email@example.com"
                                    className="bg-transparent border-none outline-none text-green-400 placeholder-gray-600 focus:ring-0 p-0 w-full"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <span className="text-orange-300">",</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="text-pink-500 mr-2">const</span>
                            <span className="text-blue-400 mr-2">message</span>
                            <span className="text-white mr-2">=</span>
                            <span className="text-orange-300">`</span>
                        </div>

                        <textarea
                            required
                            rows={4}
                            placeholder="Type your message here..."
                            className="w-full bg-transparent border-none outline-none text-green-400 placeholder-gray-600 pl-4 resize-none"
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />

                        <div className="text-orange-300">`;</div>
                        <div className="text-yellow-300">{'}'}</div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors font-sans text-xs sm:text-sm"
                            >
                                <span className="font-mono">git push origin message</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
