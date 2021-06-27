import { ReactNode } from 'react';
import '../styles/question.scss'
import cx from 'classnames';

type QuestionProps = {
    content: string;
    autor: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHigthLighted?: boolean;
}

export function Question({content, autor, children, isAnswered = false, isHigthLighted = false} : QuestionProps) {
    return (
        <div className={cx(
            'question',
            {answered: isAnswered},
            {highlighted: isHigthLighted && !isAnswered}
            )}>
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