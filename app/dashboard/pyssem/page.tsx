"use client";
import React from 'react';
import { GitBranchIcon } from 'lucide-react';
import { Code2Icon } from 'lucide-react';

export default function Page() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <h1 className="mb-8 text-2xl font-medium tracking-tighter">
                The Python Package - There is so much more 🚀
            </h1>
            <p className="prose prose-neutral dark:prose-invert">
                This web application provides a simple interface to run the model without needing to access any of the code, however, if you would like to 
                dive a little deeper - the code is available on 
                <span className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100" style={{ display: 'inline-flex' }}>
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://github.com/ARCLab-MIT/pyssem"
                        style={{ display: 'flex', alignItems: 'center', marginLeft: '4px' }}
                    >
                        GitHub <GitBranchIcon />
                    </a>
                </span>
                and
                <span className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100" style={{ display: 'inline-flex' }}>
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://test.pypi.org/project/pyssem/"
                        style={{ display: 'flex', alignItems: 'center', marginLeft: '4px' }}
                    >
                    PyPI <Code2Icon />
                    </a>
                </span>.
                <br />
                <br />
                Below is a Jupyter Notebook that demonstrates how to use the Python Package once succesfull installed.
        
            </p>
            
            <iframe 
                src="/pyssem-test.html" 
                style={{ width: '100%', height: '100%', border: 'none' }} 
                title="Jupyter Notebook"
            />
        </div>
    );
}
