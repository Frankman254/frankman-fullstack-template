import { type FC } from 'react';
import Footer from './components/Footer';
import Card from './components/Card';
import { Board } from './components/Board';
import { useState } from 'react';


const App: FC = () => {
	
const [draggedTask, setDraggedTask] = useState<string | null>(null);

	const onDrop1 = () => {
		if (draggedTask){
			const el = document.getElementById(draggedTask);
			const board = document.getElementById('board');
			board?.appendChild(el!);
			setDraggedTask(null);
		}

	}
	return (
		<div className=" min-h-screen bg-gray-100">
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900">
						{import.meta.env.VITE_APP_NAME || 'FrankmanTaskFast'}
					</h1>
					<p className="mt-2 text-gray-600">
						{import.meta.env.VITE_APP_DESCRIPTION ||
							'Kanban-Gantt Project Management'}
					</p>
				</div>
			</header>
			<main className="w-full mx-auto py-6 sm:px-6 lg:px-8 h-full">
				<div >
					<Board>
						<div id='task-1' draggable={true} onDragStart={() => setDraggedTask("task-1")}>

						<Card title="Card 1" description="Card 1 description" />
						</div>
						<div id='task-2' draggable={true}>
							<Card title="Card 2" description="Card 2 description" />
						</div>
						<div id='task-3' draggable={true}>
							<Card title="Card 3" description="Card 3 description" />
						</div>
						<div id='task-4' draggable={true}>
							<Card title="Card 4" description="Card 4 description" />
						</div>
					</Board>
					<Board>
						<div id='board' className='w-full h-full min-h-[900px]' onDragOver={(e) => e.preventDefault()} onDrop={onDrop1}>

						</div>
					</Board>
				</div>
			</main>
			<Footer>

			</Footer>
		</div>
	);
};

export default App;
