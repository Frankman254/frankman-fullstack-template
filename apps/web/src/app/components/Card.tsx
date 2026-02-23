import { type FC } from 'react';

interface CardProps {
	title: string;
	description: string;
}

const Card: FC<CardProps> = ({ title, description }) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 max-w-sm">
			<h2 className="text-lg font-bold">{title}</h2>
			<p className="text-sm text-gray-500">{description}</p>
			<button className="bg-blue-500 text-white px-4 py-2 rounded-md">
				Delete
			</button>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				Eveniet illum debitis blanditiis? Similique quis rem repellendus
				repudiandae. Reprehenderit voluptatem quaerat inventore
				consequuntur deleniti laboriosam velit impedit consequatur.
				Quasi, autem expedita!
			</p>
		</div>
	);
};

export default Card;
