import { type FC } from 'react';

interface CardProps {
	title: string;
	description: string;
}

const Card: FC<CardProps> = ({ title, description }) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 w-full">
			<h2 className="text-lg font-bold">{title}</h2>
			<p className="text-sm text-gray-500">{description}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde aliquam, alias, quae est fugit ducimus laborum odit, sapiente officiis tempora illo repudiandae. Non est animi, fugit culpa tenetur nemo ut.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde aliquam, alias, quae est fugit ducimus laborum odit, sapiente officiis tempora illo repudiandae. Non est animi, fugit culpa tenetur nemo ut.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde aliquam, alias, quae est fugit ducimus laborum odit, sapiente officiis tempora illo repudiandae. Non est animi, fugit culpa tenetur nemo ut.
            </p>
		</div>
    );
};

export default Card;