import { ReactNode } from 'react';
import '../styles/question.scss'

type QuestionProps = {
    content: string;
    autor: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
}

export function Question({content, autor, children,} : QuestionProps) {
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={autor.avatar} alt={autor.name} />
                    <span>{autor.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}